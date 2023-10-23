import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourService } from '../tour.service';
import { Tour } from '../tour/model/tour.model';
import { DifficultyLevel } from '../tour/model/tour.model';
import { Status } from '../tour/model/tour.model';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'xp-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.css'],
})
export class TourFormComponent {
  difficultyLevels = Object.values(DifficultyLevel);

  constructor(private service: TourService) {}

  tourForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    difficulytLevel: new FormControl('', [Validators.required]),
  });

  addTour(): void {
    console.log(this.tourForm.value);
    const tour: Tour = {
      name: this.tourForm.value.name || '',
      description: this.tourForm.value.description || '',
      status: Status.Draft,
      difficultyLevel: DifficultyLevel.Hard,

      price: 0,
    };

    this.service.addTour(tour).subscribe({
      next: () => {
        console.log('uspesno');
      },
    });
  }
}
