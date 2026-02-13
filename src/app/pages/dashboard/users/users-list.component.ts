import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

import type { Models } from 'appwrite';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-users-list',
  imports: [NgClass, NgIf, NgFor],
  templateUrl: './users-list.component.html',
})
export class UsersListComponent {
  users: Models.User[] = [];
  loading = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.auth.getAllUsers().subscribe((response) => {
      this.users = response.users.filter((user) => !user.labels.includes('admin'));
      this.loading = false;
    });
  }

  toggleUser(user: Models.User) {
    this.auth
      .toggleUserStatus(user.$id)
      .subscribe((entry: Models.User) => (user.status = entry.status));
  }
}
