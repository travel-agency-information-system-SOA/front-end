import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TourPoint } from '../model/tourPoints.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { Tour } from '../tour/model/tour.model';
import { MapService } from 'src/app/shared/map/map.service';
import { TransportType } from '../tour/model/tourCharacteristic.model';

@Component({
  selector: 'xp-tour-point-form',
  templateUrl: './tour-point-form.component.html',
  styleUrls: ['./tour-point-form.component.css'],
})
export class TourPointFormComponent implements OnChanges, OnInit {
  @Output() tourPointUpdated = new EventEmitter<null>();
  @Output() closeTourPointForm = new EventEmitter<null>();
  @Input() tourPoint: TourPoint;
  @Input() shouldEdit: boolean = false;
  @Input() shouldAddPoint: boolean = false;
  @Input() tour: Tour;
  idTourPoint: number;
  elevationData: any;
  totalDistance: number;
  totalTime: number;
  yourFormGroup: FormGroup;

  constructor(
    private service: TourAuthoringService,
    private mapService: MapService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.yourFormGroup = this.formBuilder.group({
      selectedTransport: ['walking'],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.tourPointForm.reset();
    if (this.shouldEdit) {
      this.tourPointForm.patchValue(this.tourPoint);
    }
  }

  tourPointForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    latitude: new FormControl(0, [Validators.required]),
    longitude: new FormControl(0, [Validators.required]),
    secret: new FormControl('', [Validators.required]),
  });

  addTourPoint(): void {
    const tourPoint: TourPoint = {
      tourId: this.tour.id || 0,

      name: this.tourPointForm.value.name || '',
      description: this.tourPointForm.value.description || '',
      imageUrl: this.tourPointForm.value.imageUrl || '',
      latitude: 0,
      longitude: 0,
      secret: this.tourPointForm.value.secret || '',
    };

    this.mapService.coordinate$.subscribe((coordinates) => {
      tourPoint.latitude = coordinates.lat;
      tourPoint.longitude = coordinates.lng;
    });

    this.service.addTourPoint(tourPoint).subscribe({
      next: () => {
        this.tourPointUpdated.emit();
        this.service.emitTourPointAdded();

        this.tourPointForm.reset();
      },
    });
  }

  getTourCharacteristic(): void {
    this.mapService.totalDistance$.subscribe((distance) => {
      this.totalDistance = distance;
    });

    this.mapService.totalTime$.subscribe((time) => {
      this.totalTime = time;
    });

    var tourCharacteristic = {
      distance: +this.totalDistance.toFixed(2),
      duration: this.totalTime,
      transportType: this.yourFormGroup.value.selectedTransport,
    };

    if (this.tour.id !== undefined) {
      this.service
        .setTourCharacteristics(this.tour.id, tourCharacteristic)
        .subscribe({
          next: () => {
            this.closeTourPointForm.emit();
            alert('Successfully set tour characteristics');
          },
          error(err: any) {
            console.log(tourCharacteristic);
            console.log(err);
          },
        });
    } else {
      console.error('Nema dostupnog ID-ja za turu.');
    }
  }
  updateTourPoint(): void {
    const tourPoint: TourPoint = {
      tourId: this.tourPoint.tourId || 0,

      name: this.tourPointForm.value.name || '',
      description: this.tourPointForm.value.description || '',
      imageUrl: this.tourPointForm.value.imageUrl || '',
      latitude: 0,
      longitude: 0,
      secret: this.tourPointForm.value.secret || '',
    };

    tourPoint.id = this.tourPoint.id;

    this.mapService.coordinate$.subscribe((coordinates) => {
      tourPoint.latitude = coordinates.lat;
      tourPoint.longitude = coordinates.lng;
    });

    this.service.updateTourPoint(tourPoint).subscribe({
      next: (_) => {
        this.tourPointUpdated.emit();
      },
    });
  }

  onTransportChange() {
    this.mapService.setTransportMode(
      this.yourFormGroup.value.selectedTransport
    );
    this.service.emitTransportTypeChanged();
  }
}
