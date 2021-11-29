import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Company} from "../../../dashboard/interfaces/company";
import {AuthService} from "../../../auth/services/auth.service";
import {ActivatedRoute, Params} from "@angular/router";
import {CompanyService} from "../../../dashboard/services/company.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //INITIAL TAB
  active = 1;

  //Results
  listCompanies: Company[] = [];

  //Pages
  pageListVehicles: boolean = true;
  pageNewVehicle: boolean = false;
  pageEditVehicle: boolean = false;

  pageListBrands: boolean = true;
  pageNewBrand: boolean = false;
  pageEditBrand: boolean = false;

  //Variables
  userId: string | any;
  editVehicle: string | any;
  editBrand: string | any;

  constructor(
    public authSvc: AuthService,
    private activatedRoute: ActivatedRoute,
    private companySvc: CompanyService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.userId = params.id;

        if (this.userId) {
          this.companySvc.getCompanyByUserId(this.userId).pipe(
            takeUntil(this.unsubscribe$)
          ).subscribe(
            (res: Company[]) => {
              this.listCompanies = res;
            }
          );
        }
      }
    )
  }

  //PAGES VEHICLES
  showListVehicles() {
    this.pageListVehicles = true;
    this.pageNewVehicle = false;
    this.pageEditVehicle = false;
  }

  showNewVehicle() {
    this.pageListVehicles = false;
    this.pageNewVehicle = true;
    this.pageEditVehicle = false;
  }

  showEditVehicle() {
    this.pageListVehicles = false;
    this.pageNewVehicle = false;
    this.pageEditVehicle = true;
  }

  getEditVehicle(event: any) {
    this.editVehicle = event;
    this.showEditVehicle();
  }

  //PAGES BRANDS
  showListBrands() {
    this.pageListBrands = true;
    this.pageNewBrand = false;
    this.pageEditBrand = false;
  }

  showNewBrand() {
    this.pageListBrands = false;
    this.pageNewBrand = true;
    this.pageEditBrand = false;
  }

  showEditBrand() {
    this.pageListBrands = false;
    this.pageNewBrand = false;
    this.pageEditBrand = true;
  }

  getEditBrand(event: any) {
    this.editBrand = event;
    this.showEditBrand();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
