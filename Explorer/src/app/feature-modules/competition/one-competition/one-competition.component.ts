import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionServiceService } from '../competition-service.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { CompetitionApply } from '../model/competitionApply.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { AdministrationService } from '../../administration/administration.service';
import { Profile } from '../../administration/model/profile.model';

interface ExtendedCompetitionApply extends CompetitionApply {
  userName?: string;
  userLastName?: string;
  selected?: boolean;
}

@Component({
  selector: 'xp-one-competition',
  templateUrl: './one-competition.component.html',
  styleUrls: ['./one-competition.component.css']
})
export class OneCompetitionComponent implements OnInit {

  competitionId: number | 0;
  competitionApplies: ExtendedCompetitionApply[] = [];
  isClicked: boolean = false;
  apply: CompetitionApply;

  constructor(private route: ActivatedRoute, private competitionService: CompetitionServiceService, private userService: AdministrationService){}

  ngOnInit(): void {
    this.competitionId = +this.route.snapshot.paramMap.get('id')!;
    this.getApplies();
  }

  getApplies() : void {
    this.competitionService.getAppliesByComp(this.competitionId).subscribe({
      next: (applies: PagedResults<ExtendedCompetitionApply>) => {
        this.competitionApplies = applies.results;
        this.competitionApplies.forEach(apply => {
            this.userService.getProfile(apply.userId).subscribe({
              next: (data: Profile) => {
                apply.userName = data.name;
                apply.userLastName = data.surname;
                apply.selected = false;
              }
            })
        });
      }
    })
  }

  selectApply(apply: ExtendedCompetitionApply) : void {
    if(apply.selected == true){
      apply.selected = false;
      console.log(apply.numLikes);
      apply.numLikes -= 1;
      this.competitionService.updateApply(apply).subscribe({
        next: (apply : CompetitionApply) => {
          console.log(apply.numLikes);
        }
      })
    }
    else if(apply.selected == false){
      apply.selected = true;
      console.log(apply.numLikes);
      apply.numLikes += 1;
      this.competitionService.updateApply(apply).subscribe({
        next: (apply : CompetitionApply) => {
          console.log(apply.numLikes);
        }
      })
      //this.selectedTours.push(tour);
    }
  }

  
}
