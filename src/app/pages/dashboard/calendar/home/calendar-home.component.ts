import { Component, effect, inject, Signal, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking

import itLocale from '@fullcalendar/core/locales/it';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import { DbService } from '../../../../services/db.service';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar-home',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, FormsModule, RouterModule, RouterOutlet],
  templateUrl: './calendar-home.component.html',
})
export class CalendarHomeComponent {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  selectedStatus: string = 'ALL';
  dateYearMonth: Date = new Date();
  eventCount: number = 0;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin],
    themeSystem: 'bootstrap5',
    timeZone: 'UTC',
    events: [],
    locale: itLocale,
    eventsSet: (events) => this.handleEventsSet(events),
    eventDidMount: (info) => this.handleEventDidMount(info),
    datesSet: (info) => this.handleDatesSet(info),
    dateClick: (info) => this.handleDateClick(info),
    eventClick: (info) => this.handleEventClick(info),
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: DbService,
    private auth: AuthService,
  ) {
    this.reloadEvents();
  }

  reloadEvents() {
    this.db.loadEvents(this.dateYearMonth, this.selectedStatus).subscribe((events) => {
      this.eventCount = events.total;
      this.calendarOptions = { ...this.calendarOptions, events: events.documents };
    });
  }

  ngOnInit(): void {}

  handleEventsSet(events: any) {
    document.querySelectorAll('.fc-daygrid-day').forEach((el) => {
      const cell = el as HTMLElement;
      const dateStr = cell.getAttribute('data-date');

      // 2. Filtra eventi dello stesso giorno
      const eventsOnDay = events.filter((ev: any) => ev.startStr.startsWith(dateStr));

      // 3. Se ci sono 2+ eventi → disabilita click
      if (eventsOnDay.length >= 2) {
        cell.style.backgroundColor = 'rgba(255, 0, 0, 0.15)';
        cell.style.cursor = 'not-allowed';
        cell.setAttribute('data-disabled-day', 'true');
      } else {
        // (opzionale) riattiva se cambi vista
        cell.style.backgroundColor = '';
        cell.style.cursor = 'pointer';
        cell.removeAttribute('data-disabled-day');
      }
    });
  }

  async handleEventDidMount(info: any) {
    info.el.style.display = 'none';
    info.el.style.pointerEvents = 'auto';
    info.el.style.cursor = 'pointer';
    info.el.style.opacity = '1';

    const evCustomerId = info.event.extendedProps['customerId'];
    const currentUser = await this.auth.getCurrentUser();

    if (currentUser.labels.includes('admin')) info.el.style.display = 'block';

    if (evCustomerId == currentUser.$id) info.el.style.display = 'block';
  }

  handleDatesSet(info: any) {
    const currentDate = this.calendarComponent.getApi().getDate();
    this.dateYearMonth = new Date(currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1));
    this.reloadEvents();
  }

  handleDateClick(info: any) {
    if (info.dayEl.getAttribute('data-disabled-day') === 'true') {
      info.jsEvent.preventDefault(); // blocca il click
      return;
    }
    this.router.navigate(['dashboard/calendar/create'], { state: { date: info.dateStr } });
  }

  handleEventClick(info: any) {
    this.router.navigate([info.event.extendedProps.$id, 'edit'], { relativeTo: this.route });
  }
}
