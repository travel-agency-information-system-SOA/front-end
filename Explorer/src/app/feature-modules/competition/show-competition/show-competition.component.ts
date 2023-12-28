import { Component } from '@angular/core';
import { Competition } from '../model/competition.model';

@Component({
  selector: 'xp-show-competition',
  templateUrl: './show-competition.component.html',
  styleUrls: ['./show-competition.component.css']
})
export class ShowCompetitionComponent {
  competition: Competition[] = []

}
