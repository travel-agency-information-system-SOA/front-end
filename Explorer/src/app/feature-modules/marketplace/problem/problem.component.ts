import { Component, OnInit } from '@angular/core';
import { Problem } from '../model/problem.model';
import { MarketplaceService } from '../marketplace.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {
  
  problem: Problem[] = [];
  selectedProblem: Problem;
  user: User;

  constructor(private service: MarketplaceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.getGuideProblems(this.user.id);
  } 


  getGuideProblems(id: number): void {
    this.service.getGuideProblems(id).subscribe({
      next: (result: PagedResults<Problem>) => {
        this.problem = result.results;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  onProblemReplay(prob : Problem): void {
    this.selectedProblem = prob;
  }

}

