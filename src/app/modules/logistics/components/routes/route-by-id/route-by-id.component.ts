import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Route} from "../../../interfaces/route";
import {RouteService} from "../../../services/route.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-route-by-id',
  templateUrl: './route-by-id.component.html',
  styleUrls: ['./route-by-id.component.scss']
})
export class RouteByIdComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() routeId: string | any;

  //result
  route = {} as Route;

  constructor(private routeSvc: RouteService) {
  }

  ngOnInit(): void {
    if (this.routeId) {
      this.routeSvc.getRouteById(this.routeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.route = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
