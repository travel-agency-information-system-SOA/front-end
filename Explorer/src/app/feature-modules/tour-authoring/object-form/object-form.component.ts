import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourAuthoringService } from '../tour-authoring.service';
import { TourObject } from '../model/tourObject.model';
import { environment } from 'src/env/environment';

@Component({
  selector: 'xp-object-form',
  templateUrl: './object-form.component.html',
  styleUrls: ['./object-form.component.css']
})
export class ObjectFormComponent implements OnChanges{
  constructor(private service: TourAuthoringService) { }

  @Output() objectUpdated = new EventEmitter<null>();
  @Input() object: TourObject;
  @Input() shouldEdit: boolean = false;

  ngOnChanges(): void{
    this.objectForm.reset();
    if (this.shouldEdit) {
      this.objectForm.patchValue(this.object);
    }
  }

  objectForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required])
  })

  addObject(): void {
    console.log(this.objectForm.value)

    const object : TourObject = {
      name: this.objectForm.value.name || "",
      description: this.objectForm.value.description || "",
      category: this.objectForm.value.category || "",
      imageUrl: this.objectForm.value.imageUrl || ""
    }

    this.service.addObject(object).subscribe({
      next: (_) => {
        this.objectUpdated.emit()
      }
    });
  }

  updateObject(): void{
    const object: TourObject = {
      name : this.objectForm.value.name || "",
      description : this.objectForm.value.description || "",
      imageUrl : this.objectForm.value.imageUrl || "",
      category : this.objectForm.value.category || ""
    }
    object.id = this.object.id;
    this.service.updateObject(object).subscribe({
      next: () => { this.objectUpdated.emit(); }
    });
  }
}
