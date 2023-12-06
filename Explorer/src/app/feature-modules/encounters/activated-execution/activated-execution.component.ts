import { Component, OnChanges,
  SimpleChanges,Output,EventEmitter } from '@angular/core';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { Router } from '@angular/router';
import { MapService } from 'src/app/shared/map/map.service';
import { UserPosition } from '../../administration/model/userPosition.model';
import { EncounterExecution } from '../model/encounter-execution.model';
import { EncountersExecutionService } from '../encounters-execution.service';
import { AdministrationService } from '../../administration/administration.service';
import { FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
@Component({
  selector: 'xp-activated-execution',
  templateUrl: './activated-execution.component.html',
  styleUrls: ['./activated-execution.component.css']
})
export class ActivatedExecutionComponent implements OnChanges {
  activeEncounter:EncounterExecution
  userId: number = this.tokenStorage.getUserId();
  shouldEdit:boolean
  idPosition:number|undefined
  userPosition:UserPosition

  constructor(private service:EncountersExecutionService,
    private tokenStorage: TokenStorage,
    private router:Router,
    private mapService:MapService,
    private administrationService:AdministrationService
   
){}

  userPositionForm = new FormGroup({
    latitude: new FormControl(0, [Validators.required]),
    longitude: new FormControl(0, [Validators.required]),
  });

  ngOnChanges(changes: SimpleChanges): void {
    this.userPositionForm.reset();
    if (this.shouldEdit) {

      const formValues = {

      latitude: this.userPosition.latitude,
      longitude: this.userPosition.longitude,
    };
      this.userPositionForm.patchValue(formValues);
  }
}

  

  ngOnInit(): void {
    this.checkUserPosition();
    //this.getEncounterExecutionByUser(this.userId);

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

  updateUserPosition(): void {
    var id = 0;
    
  
    this.administrationService.getByUserId(this.tokenStorage.getUserId(), 0, 0).subscribe(
      (result) => {
        this.userPosition=result;
        this.idPosition = result ? result.id : undefined;
      },
      (error) => {
        console.error('Error fetching user positions:', error);
      }
    );

    //userPosition.id=this.idPosition;

    this.mapService.coordinate$.subscribe((coordinates) => {
      this.userPosition.latitude = coordinates.lat;
      this.userPosition.longitude = coordinates.lng;
    });
  }

  
  updatePositions(event:MouseEvent):void{
    this.updateUserPosition();
  }

  
}
