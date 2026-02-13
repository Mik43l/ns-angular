import { Injectable } from '@angular/core';
import { storage, ID, Permission, Role } from '../../lib/appwrite';
import { from } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  async createFile(file: File) {
    return await storage.createFile(environment.documentsBucketId, ID.unique(), file);
  }

  async getFile(fileId: string) {
    return await storage.getFile(environment.documentsBucketId, fileId);
  }

  async getFileDownload(fileId: string) {
    return await storage.getFileDownload(environment.documentsBucketId, fileId);
  }

  async deleteFile(fileId: string) {
    return await storage.deleteFile(environment.documentsBucketId, fileId);
  }
}
