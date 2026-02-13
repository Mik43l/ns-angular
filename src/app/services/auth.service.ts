import { inject, Injectable } from '@angular/core';
import { account, ID } from '../../lib/appwrite';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import type { Models } from 'appwrite';
import { environment } from '../../environments/environment';

interface UsersList {
  total: number;
  users: Models.User[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private _user$ = new BehaviorSubject<any | null>(null);
  user$ = this._user$.asObservable();

  private _role: 'admin' | 'user' = 'user';

  constructor() {}

  // Invia il Magic Link
  createMagicURL(email: string) {
    return account.createMagicURLToken(
      ID.unique(),
      email,
      `${environment.appUrl}/auth/callback`, // URL di callback
    );
  }

  // Completa la sessione dopo il click sul link
  async completeMagicSession(userId: string, secret: string) {
    const user = (await firstValueFrom(
      this.http.get(`${environment.nodeUrl}/users/${userId}`),
    )) as Models.User;

    if (!user.status) return;

    await account.updateMagicURLSession(userId, secret);
    await firstValueFrom(
      this.http.post(`${environment.nodeUrl}/create-target`, { userId: userId }),
    );
    await this.loadAccount();
  }

  async loadAccount() {
    try {
      const user = await account.get();
      this._user$.next(user);

      if (user?.labels?.includes('admin')) {
        this._role = 'admin';
      } else {
        this._role = 'user';
      }
    } catch (err) {
      this._user$.next(null);
    }
  }

  async updateCurretnUser(name: string) {
    return await account.updateName(name);
  }

  toggleUserStatus(userId: string) {
    return this.http.post(`${environment.nodeUrl}/update-user-status`, {
      userId: userId,
    }) as Observable<Models.User>;
  }

  getAllUsers(): Observable<UsersList> {
    return this.http.get(`${environment.nodeUrl}/users`) as Observable<UsersList>;
  }

  clearUser() {
    this._user$.next(null);
  }

  async getCurrentUser() {
    return await account.get();
  }

  isAdmin(): boolean {
    return this._role === 'admin';
  }

  getRole(): 'admin' | 'user' {
    return this._role;
  }

  isLoggedIn(): boolean {
    return !!this._user$.value;
  }

  async logout() {
    await account.deleteSession('current');
    this._user$.next(null);
  }
}
