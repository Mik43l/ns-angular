import { Component, inject, Signal, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking

import itLocale from '@fullcalendar/core/locales/it';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import { DbService } from '../../../services/db.service';
import { ROUTER_OUTLET_DATA, RouterModule, RouterOutlet } from '@angular/router';
import { Models } from 'appwrite';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent {
  outletData = inject(ROUTER_OUTLET_DATA) as Signal<{ isAdmin: boolean }>;
}
