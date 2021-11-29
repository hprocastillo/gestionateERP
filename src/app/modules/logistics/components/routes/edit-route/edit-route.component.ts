import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import firebase from "firebase";
import {takeUntil} from "rxjs/operators";

//Services
import {RouteService} from "../../../services/route.service";

//Interfaces
import {Company} from "../../../../dashboard/interfaces/company";
import {Cities, Route} from "../../../interfaces/route";
import User = firebase.User;

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.scss']
})
export class EditRouteComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() editRoute: string | any;
  @Input() company = {} as Company;
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();

  //Results
  route = {} as Route;
  listCities: Cities[] = [];

  //Variables
  today = new Date();

  constructor(private routeSvc: RouteService) {
  }

  ngOnInit(): void {
    if (this.editRoute) {
      this.routeSvc.getRouteById(this.editRoute).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.route = res;
        }
      );
    }
    if (this.company.id) {
      this.routeSvc.getCities(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Cities[]) => {
          this.listCities = res;
        }
      );
    }
  }

  getEdit(user: User, editRoute: string) {
    this.route.updatedBy = user.uid;
    // @ts-ignore
    this.route.updatedAt = this.today;
    this.routeSvc.updateRoute(this.route, editRoute).then();
    this.cancel.emit(false);
  }

  getCancel() {
    this.cancel.emit(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
