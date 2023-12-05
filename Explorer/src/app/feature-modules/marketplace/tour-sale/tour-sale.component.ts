import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TourSale } from '../model/tour-sale.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { MarketplaceService } from '../marketplace.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tour } from '../../tour-authoring/tour/model/tour.model';

@Component({
  selector: 'xp-tour-sale',
  templateUrl: './tour-sale.component.html',
  styleUrls: ['./tour-sale.component.css'],
  providers: [DatePipe]
})
export class TourSaleComponent {
  tours: Tour[] = [];
  toursSelected: Tour[] = [];
  tours1: Tour[] = [];
  toursSelected1: Tour[] = [];
  tourSales: TourSale[] = [];
  selectedTourSale: TourSale;
  shouldEdit: boolean;
  shouldRenderTourSaleForm: boolean = false;
  srcd: boolean = false;
  showupdt: boolean = false;
  user: number;

  constructor(private service: MarketplaceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user.id;
      console.log(this.user);
    });
    this.getTourSales(this.user);
  }

  getTourSales(id: number): void {
    if(!this.shouldEdit) this.shouldRenderTourSaleForm = false;

    this.service.getTourSales(id).subscribe({
      next: (result: PagedResults<TourSale>) => {
        console.log(result);
        this.tourSales = result.results;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  onEditClicked(ts: TourSale): void {
    this.tourSaleForm1.reset();
    this.tourSaleForm2.reset();
    this.tourSaleForm3.reset();
    this.shouldRenderTourSaleForm = true;
    this.shouldEdit = true;
    this.selectedTourSale = ts;
    this.showupdt = false;
    this.srcd = false;
    this.tourSaleForm3.get('date1')?.setValue(this.selectedTourSale.startDate.toString().split('T')[0]);
    this.tourSaleForm3.get('date2')?.setValue(this.selectedTourSale.endDate.toString().split('T')[0]);
    this.tourSaleForm3.get('salePerc')?.setValue(this.selectedTourSale.salePercentage);
    console.log(this.selectedTourSale);
  }

  onDeleteClicked(ts: TourSale): void {
    this.tourSaleForm1.reset();
    this.tourSaleForm2.reset();
    this.tourSaleForm3.reset();
    this.selectedTourSale = ts;
    this.showupdt = false;
    this.shouldRenderTourSaleForm = false;
    this.srcd = false;
    this.service.deleteTourSale(this.selectedTourSale).subscribe({
      next: (_) => {
        console.log("Deleted");
        this.getTourSales(this.user);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  onAddClicked(): void {
    this.shouldRenderTourSaleForm = true;
    this.showupdt = false;
    this.shouldEdit = false;
  }

  tourSaleForm1 = new FormGroup({
    date1: new FormControl(''),
    date2: new FormControl('')
  });
  tourSaleForm2 = new FormGroup({
    salePerc:  new FormControl(0, [Validators.min(1), Validators.max(100)])
  });
  tourSaleForm3 = new FormGroup({
    date1: new FormControl(''),
    date2: new FormControl(''),
    salePerc: new FormControl(0, [Validators.min(1), Validators.max(100)])
  });

  searchTourSale(): void {
    if (!this.tourSaleForm1.value.date1 || !this.tourSaleForm1.value.date2) return;
    const d1 = this.tourSaleForm1.value.date1.toString().split('T')[0];
    const d2 = this.tourSaleForm1.value.date2.toString().split('T')[0];
  
    this.service.getPubToursForAut(this.user).subscribe({
      next: (result) => { 
        console.log('Searched');
        this.tours = result.results;
        this.toursSelected = [];
        let copp = this.tourSales;
  
        if (this.tourSales && this.tours) {
          this.tours = this.tours.filter(tour => {
            const tourId = tour.id || -1;
            let xx = true;
            copp.forEach((elem) => {
              if(elem.startDate.toString().split('T')[0] <= d2 && d1 <= elem.endDate.toString().split('T')[0]) {
                if(elem.tourIds.includes(tourId)) {xx = false;}
              }
            });
            return xx;
          });
        }
        //ne radi bas ovo ispod
        if (this.tours) {
          this.srcd = true;
        } else {
          alert("Nemaa");
        }
      }
    });
  }
  onPlusTour1(id: Tour): void {
    const index = this.tours1.indexOf(id);
    if (index !== -1) {
      this.toursSelected1.push(id);
      this.tours1.splice(index, 1);
    }
  }
  onMinusTour1(id: Tour): void {
    const index = this.toursSelected1.indexOf(id);
    if (index !== -1) {
      this.tours1.push(id);
      this.toursSelected1.splice(index, 1);
    }
  }

  onPlusTour(id: Tour): void {
    const index = this.tours.indexOf(id);
    if (index !== -1) {
      this.toursSelected.push(id);
      this.tours.splice(index, 1);
    }
  }
  onMinusTour(id: Tour): void {
    const index = this.toursSelected.indexOf(id);
    if (index !== -1) {
      this.tours.push(id);
      this.toursSelected.splice(index, 1);
    }
  }

  addTourSale(): void {
    const tourSale: TourSale = {
      authorId: this.user,
      startDate: this.tourSaleForm1.value.date1
        ? new Date(this.tourSaleForm1.value.date1)
        : new Date(Date.now()),
      endDate: this.tourSaleForm1.value.date2
        ? new Date(this.tourSaleForm1.value.date2)
        : new Date(Date.now()),
      salePercentage: this.tourSaleForm2.value.salePerc || 0,
      tourIds: this.toursSelected.map(tour => tour?.id || -1)
    }
    if(!tourSale.tourIds) return; // ako nema tura nemore kreirat mozda i za ostala polja uraditi NE RADIi provera da je razmak datuma 14
    this.service.addTourSale(tourSale).subscribe({
      next: (_) => { 
        console.log('Sale Created')
        this.tourSaleForm1.reset();
        this.tourSaleForm2.reset();
        this.tourSaleForm3.reset();
        this.showupdt = false;
        this.shouldRenderTourSaleForm = false;
        this.srcd = false;
        this.getTourSales(this.user)
      }
    });
  }
  updateTourSale1(): void {
    this.tours = [];
    this.toursSelected = [];
    this.tours1 = [];
    this.toursSelected1 = [];
    if (!this.tourSaleForm3.value.date1 || !this.tourSaleForm3.value.date2) return;
    const d1 = this.tourSaleForm3.value.date1.toString().split('T')[0];
    const d2 = this.tourSaleForm3.value.date2.toString().split('T')[0];
    this.service.getPubToursForAut(this.user).subscribe({
      next: (result) => { 
        console.log('Searched');
        this.tours = result.results;
        this.toursSelected = [];
        let copp = this.tourSales;
  
        if (this.tourSales && this.tours) { //izdvoji tu koju updejtas
          this.tours = this.tours.filter(tour => {
            const tourId = tour.id || -1;
            let xx = true;
            copp.forEach((elem) => {
              if(elem.id == this.selectedTourSale.id) {console.log("dubl")} else{
              if(elem.startDate.toString().split('T')[0] <= d2 && d1 <= elem.endDate.toString().split('T')[0]) {
                if(elem.tourIds.includes(tourId)) {xx = false;}
              }}
            });
            return xx;
          });
        }
        //ne radi bas ovo ispod
        if (this.tours) {
          this.srcd = true;
        } else {
          alert("Nemaa");
        }


        console.log(this.tours);
        console.log(this.toursSelected);
        console.log(this.tours1);
        console.log(this.toursSelected1);
        console.log(this.selectedTourSale.tourIds);
        //check availabilty for dates to tours
        if(!this.selectedTourSale.tourIds) this.toursSelected1 = [];
        else {
          //this.tours1 = this.tours; //bez this.selectedTourSale.tourIds
          let coppp = this.tours;
          coppp.forEach((elem) => {
            if(!this.selectedTourSale.tourIds.includes(elem.id || -1)) {
              this.tours1.push(elem);
            }
            else this.toursSelected1.push(elem);
          });

          //this.toursSelected1 =this.tours; // presek this.selectedTourSale.tourIds ;
        } 
        this.showupdt = true;

      }
    });
  }

  updateTourSale(): void {
    const tourSale: TourSale = {
      authorId: this.user,
      startDate: this.tourSaleForm3.value.date1
        ? new Date(this.tourSaleForm3.value.date1)
        : new Date(Date.now()),
      endDate: this.tourSaleForm3.value.date2
        ? new Date(this.tourSaleForm3.value.date2)
        : new Date(Date.now()),
      salePercentage: this.tourSaleForm3.value.salePerc || 0,
      tourIds: this.toursSelected1.map(tour => tour?.id || -1)
    }
    tourSale.id = this.selectedTourSale.id;

    this.service.updateTourSale(tourSale).subscribe({
      next: (_) => { 
        console.log('Sale Updated')
        this.showupdt = false;
        this.getTourSales(this.user);
        this.selectedTourSale.tourIds = this.toursSelected1.map(tour => tour?.id || -1);
      }
    });
  }
}
