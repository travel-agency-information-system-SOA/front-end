import { Component, OnInit } from '@angular/core';
import { Encounter } from '../model/encounter.model';
import { EncountersService } from '../encounters.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { EncountersExecutionService } from '../encounters-execution.service';
import { EncounterExecution } from '../model/encounter-execution.model';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { Router } from '@angular/router';
import { MapService } from 'src/app/shared/map/map.service';


@Component({
  selector: 'xp-encounters-map',
  templateUrl: './encounters-map.component.html',
  styleUrls: ['./encounters-map.component.css']
})
export class EncountersMapComponent implements OnInit {
  activeEncounters: Encounter[] = [];
  encounterExecution: EncounterExecution;
  constructor(private router: Router, 
              private tokenStorage: TokenStorage, 
              private encounterService: EncountersService, 
              private executionService: EncountersExecutionService,
              private mapService: MapService){ }

  ngOnInit(): void {
    this.getActiveEncounters(); 
  }
  getActiveEncounters(): void {
    this.encounterService.getEncounters().subscribe({
      next: (result: PagedResults<Encounter>) => {
        this.activeEncounters = result.results.filter(encounter => encounter.status === 'ACTIVE');
        }
      })
    }


    activateEncounter(selectedEncounter:Encounter) {
      this.encounterExecution = {
        id: 0,
        userId: this.tokenStorage.getUserId(),
        encounterId: selectedEncounter.id,
        completionTime: undefined,
        isCompleted: false
      }
      this.executionService.addEncounterExecution(this.encounterExecution).subscribe({
        next: (_) => {
          this.router.navigate(['/encountersMap/activatedEncouter']);
        }
      })
    }
  }

