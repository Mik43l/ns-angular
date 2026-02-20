import { inject, Injectable } from '@angular/core';
import { databases, Query, ID, Permission, Role } from '../../lib/appwrite';
import { firstValueFrom, from } from 'rxjs';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private http = inject(HttpClient);

  private formatDateYYYYMM(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based

    return `${year}-${month}`;
  }

  loadEvents(date: Date, status: string = 'APPROVED') {
    const query = [Query.contains('start', this.formatDateYYYYMM(date))];
    if (status !== 'ALL') query.push(Query.equal('status', status));
    return from(
      databases.listDocuments(
        environment.databaseId, // databaseId
        environment.eventsCollectionId, // collectionId
        [...query], // queries (optional)
      ),
    );
  }

  async createEvent(id: string, name: string, email: string, title: string, start: string) {
    return await databases.createDocument(
      environment.databaseId,
      environment.eventsCollectionId,
      ID.unique(),
      {
        customerId: id,
        customerName: name,
        customerEmail: email,
        title: title,
        start: start,
      },
      [
        Permission.read(Role.user(id)),
        Permission.write(Role.user(id)),
        Permission.update(Role.user(id)),
      ],
    );
  }

  async getEvent(id: string) {
    return await databases.getDocument(environment.databaseId, environment.eventsCollectionId, id);
  }

  async updateEvent(id: string, title: string, status: string, documents: string[]) {
    const event = await this.getEvent(id);

    return await databases.updateDocument(
      environment.databaseId,
      environment.eventsCollectionId,
      id,
      {
        title: title,
        status: status,
        documents: documents,
      },
    );
  }

  async sendEmail(eventId: string, mode: string = 'create') {
    await firstValueFrom(
      this.http.post(`${environment.nodeUrl}/send-email`, { documentId: eventId, mode: mode }),
    );
  }
}
