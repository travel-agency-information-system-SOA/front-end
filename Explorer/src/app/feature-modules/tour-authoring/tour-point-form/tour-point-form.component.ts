import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourPoint } from '../model/tourPoints.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { Tour } from '../tour/model/tour.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-tour-point-form',
  templateUrl: './tour-point-form.component.html',
  styleUrls: ['./tour-point-form.component.css']
})
export class TourPointFormComponent implements OnChanges {

  @Output() tourPointUpdated = new EventEmitter<null>();
  @Input() tourPoint: TourPoint;
  @Input() shouldEdit: boolean = false;
  @Input() shouldAddPoint: boolean = false;
  @Input() tour: Tour;
  idTourPoint: number;

  constructor(private service: TourAuthoringService) {}

  ngOnChanges(changes: SimpleChanges): void{
    this.tourPointForm.reset();
    if(this.shouldEdit) {
      this.tourPointForm.patchValue(this.tourPoint);
    }
    
  }

  tourPointForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    latitude: new FormControl(0, [Validators.required]),
    longitude: new FormControl(0, [Validators.required])
  })

  addTourPoint() : void{
      const tourPoint: TourPoint = {
        idTour: this.tour.id || 0,
        name: this.tourPointForm.value.name || "",
        description: this.tourPointForm.value.description || "",
        imageUrl: this.tourPointForm.value.imageUrl || ""
      };
      this.service.addTourPoint(tourPoint).subscribe({
        next: () => { this.tourPointUpdated.emit() 
        console.log("Tour id: " + this.tour.id);
        }
      });

  }

  updateTourPoint() : void {
    const tourPoint: TourPoint = {
      idTour: this.tour.id || 0,
      name: this.tourPointForm.value.name || "",
      description: this.tourPointForm.value.description || "",
      imageUrl: this.tourPointForm.value.imageUrl || ""
    }

    tourPoint.id = this.tourPoint.id;

    this.service.updateTourPoint(tourPoint).subscribe({
      next: (_) => {
        this.tourPointUpdated.emit()
      }
    })
  }

}
