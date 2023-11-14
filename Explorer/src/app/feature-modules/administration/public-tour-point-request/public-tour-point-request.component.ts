import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Status, TourPointRequest } from '../model/tourpoint-request.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { PublicTourPoint } from '../../tour-authoring/model/publicTourPoint.model';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { TourPoint } from '../../tour-authoring/model/tourPoints.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'xp-public-tour-point-request',
  templateUrl: './public-tour-point-request.component.html',
  styleUrls: ['./public-tour-point-request.component.css']
})
export class PublicTourPointRequestComponent implements OnInit {

  user:number
  requests : TourPointRequest[] =[]
  publicTourPoint: PublicTourPoint
  tourPointsInRequests: TourPoint[] = []
  authors: User[] = []
  bindingList: { request: TourPointRequest,name: string, description:string, username:string}[] = []

  constructor( private adminService: AdministrationService,private authService: AuthService,private service:TourAuthoringService){}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user.id;
      this.getAllRequests();
    });
  }

  getAllRequests():void{
    this.adminService.getAllTourPointRequests().subscribe({
      next:(result:PagedResults<TourPointRequest>)=>{
        this.requests = result.results.filter(req => req.status === Status.Onhold);
        console.log("Zahtjevi: "+ this.requests);
        this.getAllTourPoints();
      }
    })
    

  }

  AcceptRequest(request:TourPointRequest):void{
    this.service.AcceptRequest(request.id,request.tourPointId).subscribe({
      next:(result:PublicTourPoint)=>{
        this.publicTourPoint = result;
        this.getAllRequests();
        this.bindingList.length = 0; //ovo dodajte i u reject request
        this.getAllRequests();       // i ovo
      }
    })
  }

  RejectRequest(request:TourPointRequest):void{
    this.service.RejectRequest(request.id,request.tourPointId).subscribe({
      next:(result:PublicTourPoint)=>{
        this.publicTourPoint = result;
        this.getAllRequests();
        this.bindingList.length = 0; //ovo dodajte i u reject request
        this.getAllRequests();       // i ovo
      }
    })
  }

  getAllTourPoints(): void {
    const observables = this.requests.map(request => this.adminService.getTourPointById(request.tourPointId));
  
    forkJoin(observables).subscribe((results: TourPoint[]) => {
      this.tourPointsInRequests = results;  
      this.getRequestsAuthors(); 
    });
  }

  getRequestsAuthors(): void {
    const observables = this.requests.map(request => this.adminService.getAuthorById(request.authorId));
  
    forkJoin(observables).subscribe((results: User[]) => {
      this.authors = results;
  
      this.fillBindingList(); 
    });
  }

  fillBindingList(): void {
    console.log("Usao")
    this.requests.forEach(request=>{
      console.log("Prva petlja: "+ "Autor:"+ request.authorId + "Tuour point: "+ request.tourPointId)
      this.tourPointsInRequests.forEach(tp=>{
        console.log("Druga petlja: " + tp.id)
        this.authors.forEach(author => {
          console.log("Autor: " + request.authorId+ " autorId:"+author.id+",,,,tourPoint: " + request.tourPointId + " id ttur pointa: " + tp.id);
          if(request.authorId === author.id && request.tourPointId === tp.id) {
            console.log("Autor: " + request.authorId+ " autorId:"+author.id+",,,,tourPoint: " + request.tourPointId + " id ttur pointa: " + tp.id);
            this.bindingList.push({
              request: request,
              name: tp.name,
              description: tp.description,
              username: author.username
            });
          }
        })
      })
    })
  }

}
