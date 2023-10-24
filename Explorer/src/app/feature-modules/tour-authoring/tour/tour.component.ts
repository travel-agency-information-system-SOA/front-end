import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TourService } from '../tour.service';
import { Tour } from './model/tour.model';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { EquipmentDialogComponent } from '../equipment-dialog/equipment-dialog.component';
import { EquipmentService } from '../equipment.servise'; 
import { Equipment } from './model/equipment.model';

@Component({
  selector: 'xp-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css'],
})
export class TourComponent implements OnInit {
  tour: Tour[] = [];
  selectedTour: Tour;
  page: number = 1;
  pageSize: number = 5;
  tourCounter: number;
  equipment: Equipment[] = [];

  constructor(
    private service: TourService,
    private tokenStorage: TokenStorage,
    private dialog: MatDialog,
    private equipmentService: EquipmentService // Dodajte EquipmentService
  ) {}

  loadTours() {
    const userId = this.tokenStorage.getUserId();

    this.service.getTourByGuide(userId, this.page, this.pageSize).subscribe({
      next: (result: PagedResults<Tour>) => {
        this.tour = result.results;
        this.tourCounter = result.totalCount;
        console.log('Sadržaj result.results:', result.results); // Dodajte ovu liniju

        const tourIds = this.tour.map(tour => tour.id);
        console.log('ID-jevi tura:', tourIds);

      },
      error(err: any) {
        console.log(err);
      },
    });
  }

  loadEquipment() {
    this.equipmentService.getEquipment().subscribe((pagedResults: PagedResults<Equipment>) => {
      this.equipment = pagedResults.results;
      console.log(this.equipment)
    });
  }
  

  showMoreTours() {
    this.page++;
    this.loadTours();
  }

  showLessTours() {
    this.page--;
    this.loadTours();
  }

  openEquipmentDialog(tour: Tour) {
    this.selectedTour = tour;
    console.log(this.selectedTour)
    this.loadEquipment(); 

    const dialogRef = this.dialog.open(EquipmentDialogComponent, {
      width: '400px',
      data: { selectedTour: tour, equipment: this.equipment },
      
    });
    

    dialogRef.afterClosed().subscribe((selectedEquipment: any[]) => {
    });
  }

  ngOnInit(): void {
    this.loadTours();
  }
}
