import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import firebase from "firebase";
import {takeUntil} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

//Services
import {RouteService} from "../../../services/route.service";

//Interfaces
import {Company} from "../../../../dashboard/interfaces/company";
import {Cities} from "../../../interfaces/route";
import User = firebase.User;

@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.component.html',
  styleUrls: ['./new-route.component.scss']
})
export class NewRouteComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() user = {} as User;
  @Input() company = {} as Company;
  @Output() cancel = new EventEmitter<boolean>();

  //New Form
  newForm: FormGroup;

  //Results
  listCities: Cities[] = [];

  //variables
  today = new Date();

  constructor(
    private fb: FormBuilder,
    private routeSvc: RouteService) {

    this.newForm = this.fb.group({
      description: ['', [Validators.required]],
      originCity: ['', [Validators.required]],
      originAddress: ['', [Validators.required]],
      originLocation: ['', [Validators.required]],
      destinationCity: ['', [Validators.required]],
      destinationAddress: ['', [Validators.required]],
      destinationLocation: ['', [Validators.required]],
      timeOfArrival: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
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

  getSave(user: User, company: Company) {
    if (this.newForm.valid) {
      const route = this.newForm.value;
      const routeId = route?.id || null;
      route.companyId = company.id;
      route.createdBy = user.uid;
      route.createdAt = this.today;
      route.status = true;
      this.routeSvc.saveRoute(route, routeId).then();
      this.newForm.reset();
      this.cancel.emit(false);
    }
  }

  getCancel() {
    this.cancel.emit(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
