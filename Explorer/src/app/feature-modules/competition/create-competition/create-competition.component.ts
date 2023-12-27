import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Tour } from '../../tour-authoring/tour/model/tour.model';
import { CompetitionServiceService } from '../competition-service.service';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-create-competition',
  templateUrl: './create-competition.component.html',
  styleUrls: ['./create-competition.component.css'],
})
export class CreateCompetitionComponent implements OnInit {
  yourFormGroup: FormGroup;
  tourOptions: Tour[] = [];
  page: number = 1;
  pageSize: number = 5;

  constructor(
    private fb: FormBuilder,
    private competitionService: CompetitionServiceService,
    private tokenStorage: TokenStorage
  ) {}

  ngOnInit(): void {
    this.yourFormGroup = this.fb.group({
      selectedTour: [''],
    });

    this.loadTourOptions();
  }

  loadTourOptions() {
    const userId = this.tokenStorage.getUserId();

    this.competitionService
      .getTourByGuide(userId, this.page, this.pageSize)
      .subscribe({
        next: (result: PagedResults<Tour>) => {
          this.tourOptions = result.results;

          console.log('Sadržaj result.results:', result.results);
        },
        error(err: any) {
          console.log(err);
        },
      });
  }

  onTourChange(): void {
    const selectedTourId = this.yourFormGroup.get('selectedTour')!.value;
    console.log('Selected Tour ID:', selectedTourId);
  }

  competitionForm = new FormGroup({});
}
