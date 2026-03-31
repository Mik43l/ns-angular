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
      {
        id: '31',
        title: '31.jpeg',
        type: 'image',
        path: '/gallery/31.jpeg',
      },
      {
        id: '32',
        title: '32.jpeg',
        type: 'image',
        path: '/gallery/32.jpeg',
      },
      {
        id: '33',
        title: '33.jpeg',
        type: 'image',
        path: '/gallery/33.jpeg',
      },
      {
        id: '34',
        title: '34.jpeg',
        type: 'image',
        path: '/gallery/34.jpeg',
      },
      {
        id: '35',
        title: '35.jpeg',
        type: 'image',
        path: '/gallery/35.jpeg',
      },
      {
        id: '36',
        title: '36.jpeg',
        type: 'image',
        path: '/gallery/36.jpeg',
      },
      {
        id: '37',
        title: '37.jpeg',
        type: 'image',
        path: '/gallery/38.jpeg',
      },
      {
        id: '39',
        title: '39.mp4',
        type: 'video',
        path: '/gallery/39.mp4',
      },
      {
        id: '40',
        title: '40.jpeg',
        type: 'video',
        path: '/gallery/40.mp4',
      },
      {
        id: '41',
        title: '41.mp4',
        type: 'video',
        path: '/gallery/41.mp4',
      },
      {
        id: '42',
        title: '42.jpeg',
        type: 'image',
        path: '/gallery/42.jpeg',
      },
      {
        id: '43',
        title: '43.jpeg',
        type: 'image',
        path: '/gallery/43.jpeg',
      },
      {
        id: '44',
        title: '44.jpeg',
        type: 'image',
        path: '/gallery/44.jpeg',
      },
      {
        id: '45',
        title: '45.jpeg',
        type: 'image',
        path: '/gallery/45.jpeg',
      },
      {
        id: '46',
        title: '46.jpeg',
        type: 'image',
        path: '/gallery/46.jpeg',
      },
      {
        id: '47',
        title: '47.jpeg',
        type: 'image',
        path: '/gallery/47.jpeg',
      },
      {
        id: '48',
        title: '48.jpeg',
        type: 'image',
        path: '/gallery/48.jpeg',
      },
      {
        id: '49',
        title: '49.jpeg',
        type: 'image',
        path: '/gallery/49.jpeg',
      },
      {
        id: '50',
        title: '50.jpeg',
        type: 'image',
        path: '/gallery/50.jpeg',
      },
      {
        id: '51',
        title: '51.jpeg',
        type: 'image',
        path: '/gallery/51.jpeg',
      },
      {
        id: '52',
        title: '52.jpeg',
        type: 'image',
        path: '/gallery/52.jpeg',
      },
      {
        id: '53',
        title: '53.jpeg',
        type: 'image',
        path: '/gallery/53.jpeg',
      },
      {
        id: '54',
        title: '54.jpeg',
        type: 'image',
        path: '/gallery/54.jpeg',
      },
      {
        id: '55',
        title: '55.jpeg',
        type: 'image',
        path: '/gallery/55.jpeg',
      },
      {
        id: '56',
        title: '56.jpeg',
        type: 'image',
        path: '/gallery/56.jpeg',
      },
      {
        id: '56',
        title: '56.jpeg',
        type: 'image',
        path: '/gallery/56.jpeg',
      },
      {
        id: '57',
        title: '57.jpeg',
        type: 'image',
        path: '/gallery/57.jpeg',
      },
      {
        id: '58',
        title: '58.jpeg',
        type: 'image',
        path: '/gallery/58.jpeg',
      },
      {
        id: '59',
        title: '59.jpeg',
        type: 'image',
        path: '/gallery/59.jpeg',
      },
      {
        id: '60',
        title: '60.jpeg',
        type: 'image',
        path: '/gallery/60.jpeg',
      },
      {
        id: '61',
        title: '61.jpeg',
        type: 'image',
        path: '/gallery/61.jpeg',
      },
      {
        id: '62',
        title: '62.jpeg',
        type: 'image',
        path: '/gallery/62.jpeg',
      },
      {
        id: '63',
        title: '63.jpeg',
        type: 'image',
        path: '/gallery/63.jpeg',
      },
      {
        id: '64',
        title: '64.jpeg',
        type: 'image',
        path: '/gallery/64.jpeg',
      },
      {
        id: '65',
        title: '65.jpeg',
        type: 'image',
        path: '/gallery/65.jpeg',
      },
      {
        id: '66',
        title: '66.jpeg',
        type: 'image',
        path: '/gallery/66.jpeg',
      },
      {
        id: '67',
        title: '67.jpeg',
        type: 'image',
        path: '/gallery/67.jpeg',
      },
      {
        id: '68',
        title: '68.jpeg',
        type: 'image',
        path: '/gallery/68.jpeg',
      },
      {
        id: '69',
        title: '69.jpeg',
        type: 'image',
        path: '/gallery/69.jpeg',
      },
      {
        id: '70',
        title: '70.jpeg',
        type: 'image',
        path: '/gallery/70.jpeg',
      },
      {
        id: '71',
        title: '71.jpeg',
        type: 'image',
        path: '/gallery/71.jpeg',
      },
      {
        id: '72',
        title: '72.jpeg',
        type: 'image',
        path: '/gallery/72.jpeg',
      },
      {
        id: '73',
        title: '73.jpeg',
        type: 'image',
        path: '/gallery/73.jpeg',
      },
      {
        id: '74',
        title: '74.jpeg',
        type: 'image',
        path: '/gallery/74.jpeg',
      },
      {
        id: '75',
        title: '75.jpeg',
        type: 'image',
        path: '/gallery/75.jpeg',
      },
      {
        id: '76',
        title: '76.jpeg',
        type: 'image',
        path: '/gallery/76.jpeg',
      },
      {
        id: '77',
        title: '77.jpeg',
        type: 'image',
        path: '/gallery/77.jpeg',
      },
      {
        id: '78',
        title: '78.jpeg',
        type: 'image',
        path: '/gallery/78.jpeg',
      },
      {
        id: '79',
        title: '79.jpeg',
        type: 'image',
        path: '/gallery/79.jpeg',
      },
      {
        id: '80',
        title: '80.jpeg',
        type: 'image',
        path: '/gallery/80.jpeg',
      },
      {
        id: '81',
        title: '81.jpeg',
        type: 'image',
        path: '/gallery/81.jpeg',
      },
      {
        id: '82',
        title: '82.jpeg',
        type: 'image',
        path: '/gallery/82.jpeg',
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
