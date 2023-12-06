import { Component, OnInit } from '@angular/core';
import { Status, Tour } from '../../tour-authoring/tour/model/tour.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Router } from '@angular/router';
import { MarketplaceService } from '../../marketplace/marketplace.service';
import { TourPurchaseToken } from '../../marketplace/model/TourPurchaseToken.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { DifficultyLevel } from '../../tour-authoring/tour/model/tour.model';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { TourEquipmentService } from '../../tour-authoring/tour_equipment.service';
import { Equipment } from '../../tour-authoring/tour/model/equipment.model';
import { EquipmentService } from '../../tour-authoring/equipment.servise';
import { EquipmentTour } from '../../tour-authoring/tour/model/equipmentTour.model';
import { Observable, forkJoin, map } from 'rxjs';

interface ExtendedTour extends Tour {
  selected?: boolean;
}


@Component({
  selector: 'xp-purchased-tours',
  templateUrl: './purchased-tours.component.html',
  styleUrls: ['./purchased-tours.component.css']
})
export class PurchasedToursComponent implements OnInit{
  
  tours: ExtendedTour[] = []
  touristId: number
  tokens: TourPurchaseToken[] = []
  selectedTours: Tour[] = []
  tourNames : String []

  constructor(private service: MarketplaceService, private auth: AuthService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getLogedUser()
    this.getPurchasedTours()
  }

  getLogedUser(): void{
    this.auth.user$.subscribe((user) => {
      if (user.username) {
       this.touristId = user.id
       console.log(this.touristId)
      }
    });
  }
  
  /*getPurchasedTours(): void {
    this.service.getPurchasedTours(this.touristId).subscribe({
      next: (result: Tour[]) => {
        this.tours = result;
      },
      error: () => {
      }
    })
  }*/

  getPurchasedTours(): void {
    this.service.getAllTokens().subscribe({
      next: (result) => {

        this.tokens = result.results;
        console.log(this.tokens.length)
        this.tours.length = 0
        this.tokens.forEach(token => this.getTourByTourId(token));
      },
      error: () => {
      }
    })
  }

  getTourByTourId(token: TourPurchaseToken) : void {
    if(token.touristId === this.touristId) {
      this.service.getTourByTourId(token.idTour).subscribe({
        next: (tour: ExtendedTour) => {
          tour.selected = false
          this.tours.push(tour)
        },
        error: () => {
        }
      })
    }
  }


  showTourDetails(tourId: number | undefined): void {
    this.router.navigate(['purchasedTours', tourId]);
  
  }

  selectTour(tour: ExtendedTour) : void {
    if(tour.selected == true){
      tour.selected = false
      this.selectedTours = this.selectedTours.filter(t => t !== tour);
    }
    else if(tour.selected == false){
      tour.selected = true;
      this.selectedTours.push(tour);
    }
  }

  
  createComposite(): void {
  /*  this.selectedTours.forEach((tour: ExtendedTour) => {
      this.tourNames.push(tour.name);
    });*/
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        tours : this.selectedTours

      },
    });
  }

}



  @Component({
    selector: 'app-confirmation-dialog',
    template: `
  <div class="example-container">
    <h2>Choose order:</h2>
    <div
      cdkDropList
      #todoList="cdkDropList"
      [cdkDropListData]="todo"
      class="example-list"
      (cdkDropListDropped)="drop($event)"
    >
      <div class="example-box" *ngFor="let item of todo; trackBy: trackById" cdkDrag>{{ item.name }}</div>
    </div>
    <form [formGroup]="compositeTourForm">
      <label>Name for composite tour: </label>
      <input matInput [formControl]="compositeTourForm.controls['name']" type="text" />
    </form>
    <button class="button" (click)="connectTours()">Connect these tours</button>
  </div>
`,
styles: [`
  .example-container {
    width: 400px;
    max-width: 100%;
    margin: 0 auto 25px auto; /* Center the container horizontally */
    display: block;
  }

  .example-list {
    border: solid 1px #ccc;
    min-height: 60px;
    background: white;
    border-radius: 4px;
    overflow: hidden;
    display: block;
    margin-bottom: 10px; /* Add some space between the list and the button */
  }

  .example-box {
    padding: 20px 10px;
    border-bottom: solid 1px #ccc;
    color: rgba(0, 0, 0, 0.87);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    cursor: move;
    background: white;
    font-size: 14px;
  }

  .cdk-drag-preview {
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
                0 8px 10px 1px rgba(0, 0, 0, 0.14),
                0 3px 14px 2px rgba(0, 0, 0, 0.12);
  }

  .cdk-drag-placeholder {
    opacity: 0;
  }

  .cdk-drag-animating {
    transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
  }

  .example-box:last-child {
    border: none;
  }

  .example-list.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder) {
    transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
  }

  .button {
    display: block;
    margin: 0 auto; /* Center the button horizontally */
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4caf50; /* Add a background color */
    color: white; /* Set text color to white */
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s; /* Add a smooth transition for the background color */
  }

  .button:hover {
    background-color: #45a049; /* Darker color on hover */
  }
`],
    standalone: true,
    imports: [CdkDropList, CdkDrag, CommonModule, ReactiveFormsModule ],
  })
  export class ConfirmationDialog {
    
    uniqueEquipmentIds : number[] = [];

    constructor(
      public dialogRef: MatDialogRef<ConfirmationDialog>,
      @Inject(MAT_DIALOG_DATA) public data: { tours: Tour[] },
      private tokenStorage: TokenStorage,
      private router: Router,
      private service: TourAuthoringService,
      private equipmentService: EquipmentService,
      private toureqService: TourEquipmentService,
    ) {
      this.todo = [...data.tours];
    }
  
    todo: Tour[];

    compositeTourForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  
  
    drop(event: CdkDragDrop<Tour[]>) {
      console.log(this.todo)
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  
    trackById(index: number, item: Tour): number {
      return item.id || index;
    }
  
    connectTours() : void {
      const tour: Tour = {
        name: this.compositeTourForm.value.name || 'ime',
        description: 'opis',
        status: Status.Draft,
        difficultyLevel: this.calculateDifficultyLevel(),
        guideId: this.tokenStorage.getUserId(),
        price: this.calculatePrice(),
        tags: ['xzy', 'abc'],
        tourPoints: [],
        tourCharacteristics: [],
        tourReviews: [],
      };

      this.service.addTour(tour).subscribe({
        next: (result: Tour) => {
          this.addComplexTourEquipment(result.id || 0);
          this.dialogRef.close();
          this.router.navigate(['/compositeTours']);
        },
      });
    }
    calculatePrice(): number {
      var price = 0
      this.todo.forEach(tour => {
          price += tour.price;
      });
      return price;
    }
    
    calculateDifficultyLevel() : DifficultyLevel {
      var difficulty = 0
      var num = 0
      this.todo.forEach(tour => {
        if (tour.difficultyLevel == DifficultyLevel.Easy)
          difficulty += 1;
        else if (tour.difficultyLevel == DifficultyLevel.Medium){
          difficulty += 2;
        }
        else if (tour.difficultyLevel == DifficultyLevel.Hard){
          difficulty += 3;
        }
        num++;
    });

      var level =  Math.ceil(difficulty/num);
      if (level == 1)
        return DifficultyLevel.Easy
      else if (level == 2)
        return DifficultyLevel.Medium
      else
        return DifficultyLevel.Hard
    }

    findComplexTourEquipment(): Observable<number[]> {
      const observables = this.todo.map(tour => this.toureqService.getEquipmentForTour(tour.id || 0));
    
      return forkJoin(observables).pipe(
        map((results: EquipmentTour[][]) => {
          const uniqueEquipmentIds: number[] = [];
          results.forEach(tourEquipmentList => {
            tourEquipmentList.forEach(te => {
              console.log(te.equipmentId);
              if (!uniqueEquipmentIds.includes(te.equipmentId || 0)) {
                uniqueEquipmentIds.push(te.equipmentId || 0);
              }
            });
          });
          console.log("LENGTH: ", uniqueEquipmentIds.length);
          return uniqueEquipmentIds;
        })
      );
    
      

         /* this.equipmentService.getEquipment().subscribe((pagedResults: PagedResults<Equipment>) => {
              equipments = pagedResults.results;
              equipments.forEach((equipment) => {
                if (!selectedEquipmentIds.includes(equipment.id) && !uniqueEquipments.some(e => e.id === equipment.id)) {
                  uniqueEquipments.push(equipment);
                }
              });
            });*/
    }

    addComplexTourEquipment(tourId: number): void {
      this.findComplexTourEquipment().subscribe((equipmentsIds) => {
        console.log(equipmentsIds);
    
        equipmentsIds.forEach((eqId) => {
          console.log("tour id: ", tourId);
          console.log("item id", eqId);
          this.toureqService.addEquipment(tourId, eqId || 0).subscribe();
        });
      });
    }
  }
