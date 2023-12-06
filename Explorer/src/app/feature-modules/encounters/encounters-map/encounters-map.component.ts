import { Component, OnInit } from '@angular/core';
import { Encounter } from '../model/encounter.model';
import { EncountersService } from '../encounters.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { EncountersExecutionService } from '../encounters-execution.service';
import { EncounterExecution } from '../model/encounter-execution.model';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { Router } from '@angular/router';


@Component({
  selector: 'xp-encounters-map',
  templateUrl: './encounters-map.component.html',
  styleUrls: ['./encounters-map.component.css']
})
export class EncountersMapComponent implements OnInit {
  activeEncounters: Encounter[] = [];
  displayEncounters: Encounter[] = [];
  executions: EncounterExecution[] = [];
  encounterExecution: EncounterExecution;
  constructor(private router: Router, private tokenStorage: TokenStorage, private encounterService: EncountersService, private executionService: EncountersExecutionService){ }

  ngOnInit(): void {
    this.getActiveEncounters(); 
  }
  getActiveEncounters(): void {
    this.executionService.getExecutions().subscribe({
      next: (result: PagedResults<EncounterExecution>) => {
        this.executions = result.results.filter(execution => (execution.userId === this.tokenStorage.getUserId() && execution.isCompleted));
        console.log(this.executions);
        // After fetching executions, filter active encounters
        this.encounterService.getEncounters().subscribe({
          next: (result: PagedResults<Encounter>) => {
            this.displayEncounters = result.results.filter(encounter =>
              encounter.status === 'ACTIVE' && !this.executions.some(execution => execution.encounterId === encounter.id)
            );
          }
        });
      }
    });
    

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

