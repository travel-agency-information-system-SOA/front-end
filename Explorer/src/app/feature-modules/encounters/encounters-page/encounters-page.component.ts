import { Component, OnInit } from '@angular/core';
import { Encounter } from '../model/encounter.model';
import { EncountersService } from '../encounters.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-encounters-page',
  templateUrl: './encounters-page.component.html',
  styleUrls: ['./encounters-page.component.css']
})
export class EncountersPageComponent implements OnInit {
  
  encounters: Encounter[] = [];
  selectedEncounter: Encounter;
  shouldEdit: boolean = false;
  shouldEditDraft: boolean = false;

  constructor(private service: EncountersService){ }

  ngOnInit(): void {
    this.getEncounters();
  }

  getEncounters(): void{
    this.service.getEncounters().subscribe({
      next: (result: PagedResults<Encounter>) => {
        this.encounters = result.results;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  onEditClicked(encounter: Encounter): void{
    this.selectedEncounter = encounter;
    console.log(this.selectedEncounter);
    this.shouldEdit = true;
    this.shouldEditDraft = true;
    if(encounter.status != 'DRAFT'){
      this.shouldEditDraft = false;
    }
  }

  onDeleteClicked(encounter: Encounter): void{
    this.service.deleteEncounter(encounter).subscribe({
      next: (_) => {
        this.getEncounters();
      }
    });
  }

  onAddClicked(): void{
    this.shouldEdit = false;
    this.shouldEditDraft = false;
  }

  onArchiveClicked(encounter: Encounter): void{

    const updatedEncounter = {
      id: encounter.id,
      name: encounter.name,
      description: encounter.description,
      xpPoints: encounter.xpPoints,
      status: 'ARCHIVED',
      type: encounter.type,
      latitude: encounter.latitude,
      longitude: encounter.longitude
    }

    this.service.updateEncounter(updatedEncounter).subscribe({
      next: (_) => {
        this.getEncounters();
      }
    })
  }
}
