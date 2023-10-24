import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MarketplaceService } from '../marketplace.service';
import { GuideReview } from '../model/guide-review.model';

@Component({
  selector: 'xp-guide-review-form',
  templateUrl: './guide-review-form.component.html',
  styleUrls: ['./guide-review-form.component.css']
})
export class GuideReviewFormComponent implements OnChanges{

  @Output() guideReviewUpdated = new EventEmitter<null>();
  @Input() guideRev: GuideReview;
  @Input() shouldEdit: boolean = false;
  @Input() user: number;

  constructor(private service: MarketplaceService) { }

  comment: string | undefined = '';

  selectedRating: number = 0;
  onTextChanged(): void {
    if(this.shouldEdit) this.comment = this.guideReviewForm.value.comment ?? undefined;
  }
  setRating(rating: number): void {
    if(this.shouldEdit){
      this.selectedRating = rating;
      const gr: GuideReview = {
        rating: this.selectedRating,
        comment: this.comment,

        userId: 0,
        guideId: 0,
        submissionDate:new Date(Date.now())
      }
      this.guideReviewForm.reset();
      this.guideReviewForm.patchValue(gr);
    }
    else
    {
      this.selectedRating = rating;
      const gr: GuideReview = {
        rating: this.selectedRating,
        comment: this.guideReviewForm.value.comment ?? undefined,

        userId: 0,
        guideId: 0,
        submissionDate:new Date(Date.now())
      }
      this.guideReviewForm.reset();
      this.guideReviewForm.patchValue(gr);
    }
  }
  //
  ngOnChanges(changes:SimpleChanges): void {
    this.guideReviewForm.reset();
    if(this.shouldEdit){
      this.guideReviewForm.patchValue(this.guideRev);
      this.selectedRating = this.guideRev.rating;
    }
    else{//
      this.selectedRating = 0;
    }
  }

  guideReviewForm = new FormGroup({
    rating: new FormControl(0, [Validators.required]),
    comment: new FormControl('')
  })
  addGuideReview(): void {
    console.log(this.guideReviewForm.value)

    const guideReview: GuideReview = {
      userId: this.user,
      guideId: 3,//todo
      rating: this.guideReviewForm.value.rating || 0,
      comment: this.comment || '',
      submissionDate:new Date(Date.now())
    }

    this.service.addGuideReview(guideReview).subscribe({
      next: (_) => { 
        console.log('Review Added')
        this.guideReviewForm.reset(); //
        this.selectedRating = 0; //
        this.guideReviewUpdated.emit()
      }
    });
  }

  updateGuideReview(): void {
    const guideReview: GuideReview = {
      userId: this.user,
      guideId: 3,//todo
      rating: this.guideReviewForm.value.rating || 0,
      comment: this.comment || '',
      submissionDate:new Date(Date.now())
    }
    guideReview.id = this.guideRev.id;

    this.service.updateGuideReview(guideReview).subscribe({
      next: (_) => { 
        console.log('Review Updated')
        this.guideReviewUpdated.emit()
      }
    });
  }
}
