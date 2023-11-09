import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MarketplaceService } from '../marketplace.service';
import { Problem } from '../model/problem.model';
import { ProblemMessage } from '../model/problem-message.model';

@Component({
  selector: 'xp-problem-message-form',
  templateUrl: './problem-message-form.component.html',
  styleUrls: ['./problem-message-form.component.css']
})
export class ProblemMessageFormComponent{
  
  constructor(private service: MarketplaceService) { }
  
  @Input() problem: Problem;
  @Output() problemUpdated = new EventEmitter<null>();

  problemMessageForm = new FormGroup({
      content: new FormControl('', [Validators.required])
    })

  addMessage(): void{
    const problem: ProblemMessage = {
      content: this.problemMessageForm.value.content || "",
      isRead: false,
      idProblem: this.problem.id || 0
    }

    this.service.addMessage(problem).subscribe({
      next: () => {
        this.problemUpdated.emit();
      },
    });
    
  }

}
