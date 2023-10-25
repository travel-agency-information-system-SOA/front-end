import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourService } from '../tour.service';
import { Tour } from '../tour/model/tour.model';
import { DifficultyLevel } from '../tour/model/tour.model';
import { Status } from '../tour/model/tour.model';
import { takeUntil } from 'rxjs';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { FormBuilder } from '@angular/forms';
import { TourAuthoringService } from '../tour-authoring.service';

@Component({
  selector: 'xp-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.css'],
})
export class TourFormComponent {
  difficultyLevels = Object.values(DifficultyLevel);

  @Output() tourUpdated = new EventEmitter<null>();

  constructor(
    private service: TourAuthoringService,
    private tokenStorage: TokenStorage
  ) {}

  tourForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    difficulytLevel: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  addTour(): void {
    console.log(this.tourForm.value);
    const tour: Tour = {
      name: this.tourForm.value.name || '',
      description: this.tourForm.value.description || '',
      status: Status.Draft,
      difficultyLevel: this.tourForm.value.difficulytLevel as DifficultyLevel,
      guideId: this.tokenStorage.getUserId(),
      price: 0,
      tags: ['xzy', 'abc'],
    };

    this.service.addTour(tour).subscribe({
      next: () => {
        this.tourUpdated.emit();
        this.tourForm.reset();
      },
    });
  }
}
