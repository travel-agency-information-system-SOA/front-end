import { Component, Input, OnChanges } from '@angular/core';
import { ProblemMessage } from '../model/problem-message.model';
import { Problem } from '../model/problem.model';
import { MarketplaceService } from '../marketplace.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-problem-chat',
  templateUrl: './problem-chat.component.html',
  styleUrls: ['./problem-chat.component.css']
})
export class ProblemChatComponent implements OnChanges{ 
  messages: ProblemMessage[];
  @Input() problem: Problem;

  constructor(private service: MarketplaceService) {}
  
  ngOnChanges() {
    this.getMessages();
  }

  getMessages(): void{
    this.service.getMessagesByProblemId(this.problem.id || 0).subscribe({
      next: (result: PagedResults<ProblemMessage>) => {
        this.messages = result.results;
        }
      })
  }
}
