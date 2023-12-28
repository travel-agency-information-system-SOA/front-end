import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompetitionApply } from '../model/competitionApply.model';
import { ActivatedRoute } from '@angular/router';
import { CompetitionServiceService } from '../competition-service.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-apply-form',
  templateUrl: './apply-form.component.html',
  styleUrls: ['./apply-form.component.css']
})
export class ApplyFormComponent implements OnInit{
  @Input() competitionId: number | 0;
  imageUrl: string | '';
  user: User | undefined;
  @Output() closeForm = new EventEmitter<null>();
  @Output() objectUpdated = new EventEmitter<null>();
  

  constructor(private route: ActivatedRoute, private competitionService: CompetitionServiceService, private authService: AuthService){}
  
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
  }

  submitForm() : void {
    var competitionApply: CompetitionApply = {
      competitionId: this.competitionId || 0,
      imageUrl: this.imageUrl || '',
      userId: this.user?.id || 0,
      numLikes: 0,
    };
    this.competitionService.addApply(competitionApply).subscribe({
      next: () => {
        this.closeForm.emit();
        this.objectUpdated.emit();
      }
    });
  }

}
