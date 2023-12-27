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
    this.galleryService.searchImages(this.query).subscribe(
      (data: any) => {
        this.images = data.results;
      },
      (error) => {
        console.error('Error fetching images', error);
     }
   );
 }


}
