import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { Models } from 'appwrite';

@Component({
  selector: 'app-dashboard',
  providers: [AuthService],
  templateUrl: './dashboard.component.html',
  imports: [RouterModule, RouterOutlet],
})
export class DashboardComponent {
  sidebarOpen = false;
  user: any;

  constructor(private auth: AuthService, private router: Router) {
    auth.getCurrentUser().then((u) => (this.user = u));
  }

  isAdmin(): boolean {
    return this.user?.labels?.includes('admin');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
