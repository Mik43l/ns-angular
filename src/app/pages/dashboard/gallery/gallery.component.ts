import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  path: string;
  thumbnail?: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  galleryItems: GalleryItem[] = [];
  loading = true;
  selectedItem: GalleryItem | null = null;
  showLightbox = false;

  ngOnInit(): void {
    this.loadGalleryItems();
  }

  private loadGalleryItems(): void {
    // Simula il caricamento da API o file statico
    this.galleryItems = [
      {
        id: '0',
        title: '0.jpeg',
        type: 'image',
        path: '/gallery/0.jpeg',
      },
      {
        id: '1',
        title: '1.jpeg',
        type: 'image',
        path: '/gallery/1.jpeg',
      },
      {
        id: '2',
        title: '10.jpeg',
        type: 'image',
        path: '/gallery/10.jpeg',
      },
      {
        id: '3',
        title: '11.jpeg',
        type: 'image',
        path: '/gallery/11.jpeg',
      },
      {
        id: '4',
        title: '12.jpeg',
        type: 'image',
        path: '/gallery/12.jpeg',
      },
      {
        id: '5',
        title: '13.jpeg',
        type: 'image',
        path: '/gallery/13.jpeg',
      },
      {
        id: '6',
        title: '14.jpeg',
        type: 'image',
        path: '/gallery/14.jpeg',
      },
      {
        id: '7',
        title: '15.jpeg',
        type: 'image',
        path: '/gallery/15.jpeg',
      },
      {
        id: '8',
        title: '16.jpeg',
        type: 'image',
        path: '/gallery/16.jpeg',
      },
      {
        id: '9',
        title: '17.mp4',
        type: 'video',
        path: '/gallery/17.mp4',
      },
      {
        id: '10',
        title: '18.mp4',
        type: 'video',
        path: '/gallery/18.mp4',
      },
      {
        id: '11',
        title: '19.jpeg',
        type: 'image',
        path: '/gallery/19.jpeg',
      },
      {
        id: '12',
        title: '2.jpeg',
        type: 'image',
        path: '/gallery/2.jpeg',
      },
      {
        id: '13',
        title: '20.jpeg',
        type: 'image',
        path: '/gallery/20.jpeg',
      },
      {
        id: '14',
        title: '21.jpeg',
        type: 'image',
        path: '/gallery/21.jpeg',
      },
      {
        id: '15',
        title: '22.mp4',
        type: 'video',
        path: '/gallery/22.mp4',
      },
      {
        id: '16',
        title: '23.mp4',
        type: 'video',
        path: '/gallery/23.mp4',
      },
      {
        id: '17',
        title: '24.mp4',
        type: 'video',
        path: '/gallery/24.mp4',
      },
      {
        id: '18',
        title: '25.mp4',
        type: 'video',
        path: '/gallery/25.mp4',
      },
      {
        id: '19',
        title: '26.mp4',
        type: 'video',
        path: '/gallery/26.mp4',
      },
      {
        id: '20',
        title: '27.mp4',
        type: 'video',
        path: '/gallery/27.mp4',
      },
      {
        id: '21',
        title: '28.mp4',
        type: 'video',
        path: '/gallery/28.mp4',
      },
      {
        id: '22',
        title: '29.mp4',
        type: 'video',
        path: '/gallery/29.mp4',
      },
      {
        id: '23',
        title: '3.jpeg',
        type: 'image',
        path: '/gallery/3.jpeg',
      },
      {
        id: '24',
        title: '30.mp4',
        type: 'video',
        path: '/gallery/30.mp4',
      },
      {
        id: '25',
        title: '4.jpeg',
        type: 'image',
        path: '/gallery/4.jpeg',
      },
      {
        id: '26',
        title: '5.jpeg',
        type: 'image',
        path: '/gallery/5.jpeg',
      },
      {
        id: '27',
        title: '6.jpeg',
        type: 'image',
        path: '/gallery/6.jpeg',
      },
      {
        id: '28',
        title: '7.jpeg',
        type: 'image',
        path: '/gallery/7.jpeg',
      },
      {
        id: '29',
        title: '8.jpeg',
        type: 'image',
        path: '/gallery/8.jpeg',
      },
      {
        id: '30',
        title: '9.jpeg',
        type: 'image',
        path: '/gallery/9.jpeg',
      },
    ];
    this.loading = false;
  }

  openLightbox(item: GalleryItem): void {
    this.selectedItem = item;
    this.showLightbox = true;
  }

  closeLightbox(): void {
    this.showLightbox = false;
    this.selectedItem = null;
  }

  navigatePrevious(): void {
    if (!this.selectedItem) return;
    const currentIndex = this.galleryItems.findIndex((item) => item.id === this.selectedItem!.id);
    if (currentIndex > 0) {
      this.selectedItem = this.galleryItems[currentIndex - 1];
    }
  }

  navigateNext(): void {
    if (!this.selectedItem) return;
    const currentIndex = this.galleryItems.findIndex((item) => item.id === this.selectedItem!.id);
    if (currentIndex < this.galleryItems.length - 1) {
      this.selectedItem = this.galleryItems[currentIndex + 1];
    }
  }
}
