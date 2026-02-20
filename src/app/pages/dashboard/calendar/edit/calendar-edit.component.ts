import { DbService } from './../../../../services/db.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  ROUTER_OUTLET_DATA,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { StorageService } from '../../../../services/storage.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  imports: [CommonModule, FormsModule, RouterModule, RouterOutlet],
})
export class CalendarEditComponent implements OnInit {
  outletData = inject(ROUTER_OUTLET_DATA) as Signal<{ isAdmin: boolean }>;

  loading: boolean = false;
  sendEmail: boolean = false;

  event: any = {
    id: '',
    title: '',
    name: '',
    email: '',
    start: '',
    status: '',
  };

  // 🔵 File già presenti nel backend
  existingFiles: Array<{ id: string; name: string; url: string }> = [];
  // 🟢 File nuovi selezionati
  selectedFiles: File[] = [];
  // 🔴 File esistenti da eliminare
  removedExistingFileIds: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private db: DbService,
    private storage: StorageService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    // 👉 qui richiami la tua API / service per caricare l’evento tramite ID
    this.db.getEvent(id).then((event) => {
      this.event = {
        ...event,
        id: event.$id,
        name: event['customerName'],
        email: event['customerEmail'],
      };
      event['documents'].map(async (document: any) =>
        this.existingFiles.push({
          id: document,
          name: (await this.storage.getFile(document)).name,
          url: await this.storage.getFileDownload(document),
        }),
      );
    });
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    for (let i = 0; i < input.files.length; i++) {
      this.selectedFiles.push(input.files[i]);
    }
  }

  removeFile(i: number) {
    this.selectedFiles.splice(i, 1);
  }

  removeExistingFile(i: number) {
    const removed = this.existingFiles[i];

    const ok = confirm(`Vuoi davvero rimuovere il file "${removed.name}"?`);

    if (!ok) return;

    this.removedExistingFileIds.push(removed.id);
    this.existingFiles.splice(i, 1);
  }

  async update() {
    this.loading = true;
    let { title, status, documents } = await this.db.getEvent(this.event.id);

    this.event.status = this.outletData()?.isAdmin ? this.event.status : 'PENDING';

    // file da eliminare
    for (const entry of this.removedExistingFileIds) {
      await this.storage.deleteFile(entry);
      documents = documents.filter((item: string) => item !== entry);
      await this.db.updateEvent(this.event.id, this.event.title, this.event.status, documents);
    }

    // nuovi file
    for (const entry of this.selectedFiles) {
      const { $id } = await this.storage.createFile(entry);
      documents.push($id);
      await this.db.updateEvent(this.event.id, this.event.title, this.event.status, documents);
    }

    // Aggiornamento finale se non ci sono stati cambiamenti ai file
    if (this.removedExistingFileIds.length === 0 && this.selectedFiles.length === 0) {
      if (this.event.title !== title || this.event.status !== status) {
        await this.db.updateEvent(this.event.id, this.event.title, this.event.status, documents);
        await this.db.sendEmail(this.event.id, 'update');
      }
    }

    this.loading = false;
    this.router.navigate(['/calendar']);
  }

  isImageFile(filename: string): boolean {
    const lowerName = filename.toLowerCase();
    return /\.(jpg|jpeg|png|gif)$/i.test(lowerName);
  }

  downloadFile(url: string, filename: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    link.remove();
  }
}
