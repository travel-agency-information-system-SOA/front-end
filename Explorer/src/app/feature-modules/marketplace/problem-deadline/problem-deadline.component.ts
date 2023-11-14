import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MarketplaceService } from '../marketplace.service';
import { Problem } from '../model/problem.model';

@Component({
  selector: 'xp-problem-deadline',
  templateUrl: './problem-deadline.component.html',
  styleUrls: ['./problem-deadline.component.css']
})
export class ProblemDeadlineComponent {
  constructor(private service: MarketplaceService) {}

  @Input() problem: Problem;
  @Output() problemUpdated = new EventEmitter<null>();

  selectedDate = new FormControl(new Date());
  showForm = false; // Initialize as false to hide the form initially

  toggleForm(): void {
    // Toggle the form visibility
    this.showForm = !this.showForm;
    console.log(this.showForm)


    // Reset the form and set the date to the default value when showing the form
    if (this.showForm) {
      this.selectedDate.setValue(new Date());
      // Optionally, you can reset the form here if needed
      // this.deadlineForm.resetForm();
    }
  }

  addDeadline(): void {
    // Update the deadline property of the problem object
    const selectedDateValue = this.selectedDate.value || new Date();

    // Create a new problem object with updated information
    const updatedProblem: Problem = {
      id: this.problem.id,
      category: this.problem.category || "",
      priority: this.problem.priority || "",
      description: this.problem.description || "",
      time: this.problem.time || "",
      idTourist: this.problem.idTourist || 0,
      idGuide: this.problem.idGuide || 0,
      isSolved: this.problem.isSolved || false,
      deadline: selectedDateValue,
      idTour: this.problem.idTour || 0
    };

    // Call the service or perform any necessary actions to update the backend
    this.service.addDeadline(updatedProblem).subscribe({
      next: (_) => {
        // Emit the problemUpdated event
        this.problemUpdated.emit();

        // Close the form after submission
        this.showForm = false;
      }
    });
  }
}

