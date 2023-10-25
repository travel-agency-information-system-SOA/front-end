import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourPoint } from '../model/tourPoints.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { Tour } from '../tour/model/tour.model';
import { TourKeyPoint } from '../model/tourKeyPoints.model';
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
    console.log(this.tourPointForm.value)

    const tourPoint: TourPoint = {
      name: this.tourPointForm.value.name || "",
      description: this.tourPointForm.value.description || "",
      imageUrl: this.tourPointForm.value.imageUrl || ""
    }


    this.service.addTourPoint(tourPoint).subscribe({
      next: (response: PagedResults<TourPoint>) => {
        this.tourPointUpdated.emit();
        this.idTourPoint= response.results[response.totalCount-1].id || 0;
        console.log("MOLIM TE RADI: "+ this.idTourPoint);
      }
      /*next: (response: any) => {
        const tourPointId = response[1];
    
        console.log('New TourPoint Id:', tourPointId);
    
        this.tourPointUpdated.emit();

        return tourPointId;
      }
      next: (result: PagedResults<TourPoint>) => {
        var points = result.results;
        var pointsNum = result.totalCount;

        if (points && pointsNum) {
          this.idTourPoint = points[pointsNum - 1].id;
        } else {
          // Handle the case when points or pointsNum is undefined
          console.log('Unable to retrieve the idTourPoint');
        }
      },

      error(err: any) {
        console.log(err);
      }*/

    });

  }

  updateTourPoint() : void {
    const tourPoint: TourPoint = {
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

  addPointToTour() : void{
    this.addTourPoint();


    //this.service.addPointToTour(tourKeyPoints).subscribe();
    
  }
}
