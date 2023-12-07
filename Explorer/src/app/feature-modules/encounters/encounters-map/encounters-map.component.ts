import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Encounter } from '../model/encounter.model';
import { EncountersService } from '../encounters.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { EncountersExecutionService } from '../encounters-execution.service';
import { EncounterExecution } from '../model/encounter-execution.model';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { Router } from '@angular/router';
import { MapService } from 'src/app/shared/map/map.service';
import { UserPosition } from '../../administration/model/userPosition.model';
import { AdministrationService } from '../../administration/administration.service';


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
  idPosition:number|undefined
  userPosition:UserPosition;
  shouldEdit:boolean
  @Output() positionUpdated=new EventEmitter<null>();
  constructor(private router: Router, 
              private tokenStorage: TokenStorage, 
              private encounterService: EncountersService, 
              private executionService: EncountersExecutionService,
              private mapService: MapService,
              private administrationService: AdministrationService){ }

  ngOnInit(): void {
    this.getActiveEncounters(); 
    this.checkUserPosition();
  }
  getActiveEncounters(): void {
    this.executionService.getExecutions().subscribe({
      next: (result: PagedResults<EncounterExecution>) => {
        this.executions = result.results.filter(execution => (execution.userId === this.tokenStorage.getUserId() && execution.isCompleted));
        console.log(this.executions);
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
      this.executionService.getExecutions().subscribe({
        next: (result: PagedResults<EncounterExecution>) => {
          this.executions = result.results;
          const foundExecution = this.executions.find(
            execution => execution.userId === this.tokenStorage.getUserId() && execution.encounterId === selectedEncounter.id && execution.isCompleted == false
          );
          if(foundExecution == null) {
            this.encounterExecution = {
              id: 0,
              userId: this.tokenStorage.getUserId(),
              encounterId: selectedEncounter.id,
              completionTime: undefined,
              isCompleted: false
            }
            this.executionService.addEncounterExecution(this.encounterExecution).subscribe({
              next: (_) => {
                this.router.navigate(['/activeEncounter']);
              }
            })
          }
          else {
            this.router.navigate(['/activeEncounter']);
          }
        }
      })
      
      
      
      
    }

    updateUserPosition(): void {
      var id = 0;
      const userPosition: UserPosition = {
        userId: this.tokenStorage.getUserId(),
        latitude: 0.000000,
        longitude: 0.000000,
      };
    
      this.administrationService.getByUserId(this.tokenStorage.getUserId(), 0, 0).subscribe(
        (result) => {
          this.idPosition = result ? result.id : undefined;
        },
        (error) => {
          console.error('Error fetching user positions:', error);
        }
      );
  
      userPosition.id=this.idPosition;
  
      this.mapService.coordinate$.subscribe((coordinates) => {
        userPosition.latitude = coordinates.lat;
        userPosition.longitude = coordinates.lng;
      });
      this.administrationService.updateUserPosition(userPosition).subscribe({
        next: (_) => {
          this.positionUpdated.emit();
        },
      });
    }
  
    
    updatePositions(event:MouseEvent):void{
      this.updateUserPosition();
    }

    checkUserPosition(): void {
      this.administrationService.getByUserId(this.tokenStorage.getUserId(), 0, 0).subscribe(
        (result) => {
          this.shouldEdit = result != null; 
          this.idPosition = result ? result.id : undefined; 
        },
        (error) => {
          console.error('Error fetching user positions:', error);
        }
      );
    }
  }

