import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

//Services
import {CompanyService} from "../../../dashboard/services/company.service";
import {AuthService} from "../../../auth/services/auth.service";

//Interfaces
import {Company} from "../../../dashboard/interfaces/company";

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //INITIAL TAB
  active = 1;

  //Results
  listCompanies: Company[] = [];

  //Pages
  pageListRoutes: boolean = true;
  pageNewRoute: boolean = false;
  pageEditRoute: boolean = false;

  pageListTrips: boolean = true;
  pageNewTrip: boolean = false;
  pageEditTrip: boolean = false;

  pageListCities: boolean = true;
  pageNewCity: boolean = false;
  pageEditCity: boolean = false;


  //Variables
  userId: string | any;
  editRoute: string | any;
  // editTrip: string | any;
  editCity: string | any;

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


  //PAGE ROUTES
  showListRoutes() {
    this.pageListRoutes = true;
    this.pageNewRoute = false;
    this.pageEditRoute = false;
  }

  showNewRoute() {
    this.pageListRoutes = false;
    this.pageNewRoute = true;
    this.pageEditRoute = false;
  }

  showEditRoute() {
    this.pageListRoutes = false;
    this.pageNewRoute = false;
    this.pageEditRoute = true;
  }

  getEditRoute(event: any) {
    this.editRoute = event;
    this.showEditRoute();
  }

  //PAGE TRIPS
  showListTrips() {
    this.pageListTrips = true;
    this.pageNewTrip = false;
    this.pageEditTrip = false;
  }

  //PAGE CITIES
  showListCities() {
    this.pageListCities = true;
    this.pageNewCity = false;
    this.pageEditCity = false;
  }

  showNewCity() {
    this.pageListCities = false;
    this.pageNewCity = true;
    this.pageEditCity = false;
  }

  showEditCity() {
    this.pageListCities = false;
    this.pageNewCity = false;
    this.pageEditCity = true;
  }

  getEditCity(event: any) {
    this.editCity = event;
    this.showEditCity();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
