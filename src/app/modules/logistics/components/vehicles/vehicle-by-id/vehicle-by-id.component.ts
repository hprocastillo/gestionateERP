import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {VehicleService} from "../../../services/vehicle.service";
import {takeUntil} from "rxjs/operators";
import {Vehicle} from "../../../interfaces/vehicle";

@Component({
  selector: 'app-vehicle-by-id',
  templateUrl: './vehicle-by-id.component.html',
  styleUrls: ['./vehicle-by-id.component.scss']
})
export class VehicleByIdComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  @Input() vehicleId: string | any;
  @Input() field: string | any;

  //Results
  vehicle = {} as Vehicle;

  constructor(private vehicleSvc: VehicleService) {
  }

  ngOnInit(): void {
    if (this.vehicleId) {
      this.vehicleSvc.getVehicleById(this.vehicleId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.vehicle = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
