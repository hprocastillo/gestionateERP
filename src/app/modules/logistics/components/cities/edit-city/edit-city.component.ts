import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import firebase from "firebase";

//Services
import {RouteService} from "../../../services/route.service";

//Interfaces
import {Company} from "../../../../dashboard/interfaces/company";
import {Cities} from "../../../interfaces/route";
import User = firebase.User;

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss']
})

export class EditCityComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() editCity: string | any;
  @Input() company = {} as Company;
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();

  //Results
  city = {} as Cities;

  //Variables
  today = new Date();

  constructor(private routeSvc: RouteService) {
  }

  ngOnInit(): void {
    if (this.editCity) {
      this.routeSvc.getCityById(this.editCity).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.city = res;
        }
      );
    }
  }

  getEdit(user: User, editCity: string) {
    this.city.name = this.city.name.toUpperCase();
    this.city.updatedBy = user.uid;
    // @ts-ignore
    this.city.updatedAt = this.today;
    this.routeSvc.updateCity(this.city, editCity).then(r => console.log(r));
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
