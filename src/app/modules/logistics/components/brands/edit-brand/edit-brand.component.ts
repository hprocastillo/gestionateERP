import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import firebase from "firebase";

//Services
import {VehicleService} from "../../../services/vehicle.service";

//Interfaces
import {Company} from "../../../../dashboard/interfaces/company";
import {Brand} from "../../../interfaces/vehicle";
import User = firebase.User;

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})

export class EditBrandComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() editBrand: string | any;
  @Input() company = {} as Company;
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();

  //Variables
  today = new Date();

  //Results
  brand = {} as Brand;

  constructor(private vehicleSvc: VehicleService) {
  }

  ngOnInit(): void {
    if (this.editBrand) {
      this.vehicleSvc.getBrandById(this.editBrand).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.brand = res;
        }
      );
    }
  }

  getEdit(user: User, editBrand: string) {
    this.brand.brand = this.brand.brand.toUpperCase();
    this.brand.updatedBy = user.uid;
    // @ts-ignore
    this.brand.updatedAt = this.today;
    this.vehicleSvc.updateBrand(this.brand, editBrand).then();
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
