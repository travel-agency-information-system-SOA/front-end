import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Encounter } from '../model/encounter.model';
import { EncountersService } from '../encounters.service';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-encounters-form',
  templateUrl: './encounters-form.component.html',
  styleUrls: ['./encounters-form.component.css']
})
export class EncountersFormComponent implements OnChanges {

  @Output() encountersUpdated = new EventEmitter<null>();
  @Input() encounter: Encounter;
  @Input() shouldEdit: boolean = false;
  @Input() shouldEditDraft: boolean = false;

  constructor(private service: EncountersService, private router: Router){}
  
  ngOnChanges(changes: SimpleChanges): void {
    this.encounterForm.reset();
    if(this.shouldEdit){
      this.encounterForm.patchValue(this.encounter);
    }
  }

  encounterForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    xpPoints: new FormControl(0, [Validators.required]),
    type: new FormControl('SOCIAL', [Validators.required]),   // Dropdown for EncounterType
    latitude: new FormControl(0, [Validators.required]),
    longitude: new FormControl(0, [Validators.required])
  })

  addEncounter(): void{
    console.log(this.encounterForm.value)

    const encounter = {
      id: 0,
      name: this.encounterForm.value.name || '',
      description: this.encounterForm.value.description || '',
      xpPoints: this.encounterForm.value.xpPoints || 0,
      status: 'ACTIVE',
      type: this.encounterForm.value.type || 'SOCIAL',
      latitude: this.encounterForm.value.latitude || 0,
      longitude: this.encounterForm.value.longitude || 0
    }

    this.service.addEncounter(encounter).subscribe({
      next: (_) => {
        this.encountersUpdated.emit();
        this.encounterForm.reset();
      }
    });
    
    
  }

  addEncounterDraft(): void{
    console.log(this.encounterForm.value)

    const encounter = {
      id: 0,
      name: this.encounterForm.value.name || '',
      description: this.encounterForm.value.description || '',
      xpPoints: this.encounterForm.value.xpPoints || 0,
      status: 'DRAFT',
      type: this.encounterForm.value.type || 'SOCIAL',
      latitude: this.encounterForm.value.latitude || 0,
      longitude: this.encounterForm.value.longitude || 0
    }

    this.service.addEncounter(encounter).subscribe({
      next: (_) => {
        this.encountersUpdated.emit();
      }
    });

    this.encounterForm.reset();
    
  }

  postEncounterDraft(): void{
    console.log(this.encounterForm.value)

      const encounter = {
        id: this.encounter.id,
        name: this.encounterForm.value.name || '',
        description: this.encounterForm.value.description || '',
        xpPoints: this.encounterForm.value.xpPoints || 0,
        status: 'ACTIVE',
        type: this.encounterForm.value.type || 'SOCIAL',
        latitude: this.encounterForm.value.latitude || 0,
        longitude: this.encounterForm.value.longitude || 0
      }

    this.service.updateEncounter(encounter).subscribe({
      next: (_) => {
        this.encountersUpdated.emit();
      }
    });
  }

  updateEncounter(): void{

    const encounter = {
      id: this.encounter.id,
      name: this.encounterForm.value.name || '',
      description: this.encounterForm.value.description || '',
      xpPoints: this.encounterForm.value.xpPoints || 0,
      status: this.encounter.status,
      type: this.encounterForm.value.type || 'SOCIAL',
      latitude: this.encounterForm.value.latitude || 0,
      longitude: this.encounterForm.value.longitude || 0
    }

    this.service.updateEncounter(encounter).subscribe({
      next: (_) => {
        this.encountersUpdated.emit();
      }
    })
  }

}
