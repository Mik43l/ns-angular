import { AuthService } from './../../../../services/auth.service';
import { Component, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Router,
  RouterModule,
  RouterOutlet,
  ActivatedRoute,
  ROUTER_OUTLET_DATA,
} from '@angular/router';
import { DbService } from '../../../../services/db.service';

@Component({
  selector: 'app-calendar-create',
  imports: [FormsModule, RouterModule, RouterOutlet],
  templateUrl: './calendar-create.component.html',
})
export class CalendarCreateComponent {
  outletData = inject(ROUTER_OUTLET_DATA) as Signal<{ isAdmin: boolean }>;

  loading: boolean = false;

  event = {
    title: '',
    name: '',
    email: '',
    start: '',
    end: '',
    status: 'PENDING',
  };

  async initEvent() {
    const { name, email } = await this.auth.getCurrentUser();
    this.event.name = name;
    this.event.email = email;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private db: DbService,
  ) {
    // Recupera lo state
    const navigation = this.router.getCurrentNavigation();
    const date = navigation?.extras.state?.['date'];

    this.initEvent();

    if (!date) {
      // Se non c'è lo state (es. l'utente ha ricaricato la pagina), torna al calendario
      this.router.navigate(['dashboard/calendar']);
      return;
    }

    this.event.start = date;
  }

  ngOnInit() {}

  async save() {
    const { $id, name, email } = await this.auth.getCurrentUser();
    const event = await this.db.createEvent($id, name, email, this.event.title, this.event.start);
    await this.db.sendEmail(event.$id);
    this.router.navigate(['dashboard/calendar']);
  }
}
