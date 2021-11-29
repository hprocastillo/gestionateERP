import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Company} from "../../../../../dashboard/interfaces/company";
import {Trip} from "../../../../interfaces/route";
import {RouteService} from "../../../../services/route.service";
import {takeUntil} from "rxjs/operators";
import firebase from "firebase";
import User = firebase.User;

interface NewList {
  vehicleId: string;
  traveledMileage: number;
  timeOnRoute: number;
  iperc: number;
  checklist: number;
}

@Component({
  selector: 'app-indicators-by-vehicle-yearly',
  templateUrl: './indicators-by-vehicle-yearly.component.html',
  styleUrls: ['./indicators-by-vehicle-yearly.component.scss']
})
export class IndicatorsByVehicleYearlyComponent implements OnInit, OnDestroy {

  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  @Input() user = {} as User;
  @Input() company = {} as Company;

  //variable
  today = new Date();
  totalMileage: number | any;
  totalTimeOnRoute: number | any;

  //Results
  listTrips: Trip[] = [];
  newList: NewList[] = [];

  constructor(private routeSvc: RouteService) {

  }

  ngOnInit(): void {
    if (this.company.id) {
      this.routeSvc.getTrips(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Trip[]) => {
          let counter = 0;
          let totalMileage = 0;
          let totalTimeOnRoute = 0;

          if (counter === 0) {
            this.listTrips = res;
            this.listTrips = this.listTrips.filter(item => {
              return item.startDate.toDate().getFullYear() === this.today.getFullYear();
            });

            for (let l = 0; l < this.listTrips.length; l++) {
              //If newList is empty
              if (this.newList.length === 0) {
                this.newList.push(
                  {
                    vehicleId: this.listTrips[l].vehicleId,
                    traveledMileage: this.listTrips[l].traveledMileage,
                    timeOnRoute: this.listTrips[l].timeOnRoute,
                    iperc: 1,
                    checklist: 1
                  }
                );
              } else {
                let add: boolean = false;
                for (let n = 0; n < this.newList.length; n++) {
                  //if are equals
                  if ((this.newList[n].vehicleId === this.listTrips[l].vehicleId)) {
                    this.newList[n].traveledMileage = this.newList[n].traveledMileage + this.listTrips[l].traveledMileage;
                    this.newList[n].timeOnRoute = this.newList[n].timeOnRoute + this.listTrips[l].timeOnRoute;
                    this.newList[n].iperc = this.newList[n].iperc + 1;
                    this.newList[n].checklist = this.newList[n].checklist+ 1;
                    add = false;
                    break;
                  } else {
                    //if are different
                    add = true;
                  }
                }
                if (add) {
                  this.newList.push(
                    {
                      vehicleId: this.listTrips[l].vehicleId,
                      traveledMileage: this.listTrips[l].traveledMileage,
                      timeOnRoute: this.listTrips[l].timeOnRoute,
                      iperc: 1,
                      checklist: 1
                    }
                  );
                }
              }

              totalMileage = totalMileage + this.listTrips[l].traveledMileage;
              totalTimeOnRoute = totalTimeOnRoute + this.listTrips[l].timeOnRoute;
            }

            this.totalMileage = totalMileage;
            this.totalTimeOnRoute = totalTimeOnRoute;
            counter++;
          }

          console.log(this.newList);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
