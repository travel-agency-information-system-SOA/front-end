import { Component,OnInit,EventEmitter,Inject} from '@angular/core';
import { TourEquipmentService } from '../tour_equipment.service';
import { Tour } from '../tour/model/tour.model';
import { EquipmentService } from '../equipment.servise';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Equipment } from '../tour/model/equipment.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';




@Component({
  selector: 'app-equipment-dialog',
  templateUrl: './equipment-dialog.component.html',
  styleUrls: ['./equipment-dialog.component.css']
})
export class EquipmentDialogComponent  implements OnInit {
  equipment: Equipment[]; 
  selectedTour: Tour; 
  onDodajOpremu: EventEmitter<any> = new EventEmitter();
  onCloseDialog: EventEmitter<any> = new EventEmitter();

  constructor(private equipmentService: EquipmentService, private toureqService: TourEquipmentService, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<EquipmentDialogComponent>) { this.selectedTour = data.selectedTour;}

  ngOnInit(): void {
    console.log(this.selectedTour)
    if (this.selectedTour) {
  
      this.equipmentService.getEquipment().subscribe((pagedResults: PagedResults<Equipment>) => {
        this.equipment = pagedResults.results; 
        console.log('Equipment:', this.equipment);

        this.equipment.forEach(equipmentItem => {
          equipmentItem.selected = false; 
        });
      });
    }
  }
  
  dodajOpremu() {
    if (this.selectedTour) {
      const selectedEquipmentIdsStr = this.equipment
        .filter(item => item.selected)
        .map(item => item.id)
        .join(',');

      const selectedEquipmentIds: number = Number(selectedEquipmentIdsStr);
      console.log(this.selectedTour.id)

      if (this.selectedTour && this.selectedTour.id) {
        this.toureqService.addEquipment(this.selectedTour.id , selectedEquipmentIds).subscribe(result => {
        });
      }

      this.onCloseDialog.emit();
    }
  }
}