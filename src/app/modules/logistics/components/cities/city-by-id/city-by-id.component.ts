import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Cities} from "../../../interfaces/route";
import {RouteService} from "../../../services/route.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-city-by-id',
  templateUrl: './city-by-id.component.html',
  styleUrls: ['./city-by-id.component.scss']
})
export class CityByIdComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() cityId: string | any;

  //Results
  city = {} as Cities;

  constructor(private routeSvc: RouteService) {
  }

  ngOnInit(): void {
    if (this.cityId) {
      this.routeSvc.getCityById(this.cityId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.city = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
