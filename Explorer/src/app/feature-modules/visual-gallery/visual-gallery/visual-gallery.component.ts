import { Component } from '@angular/core';
import { VisualGalleryService } from '../visual-gallery.service';

@Component({
  selector: 'xp-visual-gallery',
  templateUrl: './visual-gallery.component.html',
  styleUrls: ['./visual-gallery.component.css']
})
export class VisualGalleryComponent {
  query: string;
  images: any[] = [];

  constructor(private galleryService:VisualGalleryService ) {}
  searchImages() {
    console.log(this.query);
    this.galleryService.searchImages(this.query).subscribe({
      next: (result: any) => {
        console.log('Evoo me');
        this.images = result.results;
      },
      error: (err: any) => {
        console.error('Error fetching images', err);
      }
    }
   );
 }


}
