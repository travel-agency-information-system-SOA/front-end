import { Component, OnInit } from '@angular/core';
import { Competition } from '../model/competition.model';
import { CompetitionServiceService } from '../competition-service.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { TourService } from '../../tour-authoring/tour.service';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Tour } from '../../tour-authoring/tour/model/tour.model';

interface ExtendedCompetition extends Competition {
  name?: string;
}

@Component({
  selector: 'xp-show-competition',
  templateUrl: './show-competition.component.html',
  styleUrls: ['./show-competition.component.css']
})


export class ShowCompetitionComponent implements OnInit{

  constructor(
    private competitionService: CompetitionServiceService,
    private authService: AuthService,
    private tourService:  TourAuthoringService){
  }

  competitions: ExtendedCompetition[] = []
  user: User | undefined;
  tour: Tour | undefined;
  
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
    this.getAllCompetitionsByAuthorId(this.user?.id || -1)
  }

  getAllCompetitionsByAuthorId(id: number) : void {
    this.competitionService.getAllCompetitionsByAuthorId(id).subscribe({
      next: (result: PagedResults<Competition>) => {
        this.competitions = result.results;
        this.competitions.forEach(com => {
          this.tourService.getTourByTourId(com.tourId).subscribe({
            next: (resultTour: Tour) =>{
              com.name = resultTour.name;
            }
          });
          });
        },
      error(err: any) {
        console.log(err);
      }
    })
  }


  selectCompetition(competition: Competition): void {

  }


}
