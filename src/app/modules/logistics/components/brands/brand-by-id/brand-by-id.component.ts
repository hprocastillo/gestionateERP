import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

//Services
import {VehicleService} from "../../../services/vehicle.service";

//Interfaces
import {Brand} from "../../../interfaces/vehicle";

@Component({
  selector: 'app-brand-by-id',
  templateUrl: './brand-by-id.component.html',
  styleUrls: ['./brand-by-id.component.scss']
})

export class BrandByIdComponent implements OnChanges, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() brandId: string | any;

  //Results
  brand = {} as Brand;

  constructor(private vehicleSvc: VehicleService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.brandId) {
      this.vehicleSvc.getBrandById(this.brandId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.brand = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
