import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LogisticsRoutingModule} from './logistics-routing.module';
import {RoutesComponent} from './components/routes/routes.component';
import {TripsComponent} from './components/trips/trips.component';
import {VehiclesComponent} from './components/vehicles/vehicles.component';
import {NewVehicleComponent} from './components/vehicles/new-vehicle/new-vehicle.component';
import {EditVehicleComponent} from './components/vehicles/edit-vehicle/edit-vehicle.component';
import {ListVehiclesComponent} from './components/vehicles/list-vehicles/list-vehicles.component';
import {DashboardModule} from "../dashboard/dashboard.module";
import {BrandsComponent} from './components/brands/brands.component';
import {NewBrandComponent} from './components/brands/new-brand/new-brand.component';
import {EditBrandComponent} from './components/brands/edit-brand/edit-brand.component';
import {ListBrandsComponent} from './components/brands/list-brands/list-brands.component';
import {BrandByIdComponent} from './components/brands/brand-by-id/brand-by-id.component';
import {RrhhModule} from "../rrhh/rrhh.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NewRouteComponent} from './components/routes/new-route/new-route.component';
import {EditRouteComponent} from './components/routes/edit-route/edit-route.component';
import {ListRoutesComponent} from './components/routes/list-routes/list-routes.component';
import {NgbNavModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {NewTripComponent} from './components/trips/new-trip/new-trip.component';
import {ListTripsComponent} from './components/trips/list-trips/list-trips.component';
import {EditTripComponent} from './components/trips/edit-trip/edit-trip.component';
import {RouteByIdComponent} from './components/routes/route-by-id/route-by-id.component';
import {ChecklistComponent} from './components/checklist/checklist.component';
import {NewChecklistComponent} from './components/checklist/new-checklist/new-checklist.component';
import {EditChecklistComponent} from './components/checklist/edit-checklist/edit-checklist.component';
import {ListChecklistComponent} from './components/checklist/list-checklist/list-checklist.component';
import {QuestionComponent} from './components/question/question.component';
import {NewQuestionComponent} from './components/question/new-question/new-question.component';
import {EditQuestionComponent} from './components/question/edit-question/edit-question.component';
import {ListQuestionComponent} from './components/question/list-question/list-question.component';
import {AnswerComponent} from './components/answer/answer.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {NewCategoryComponent} from './components/categories/new-category/new-category.component';
import {EditCategoryComponent} from './components/categories/edit-category/edit-category.component';
import {ListCategoriesComponent} from './components/categories/list-categories/list-categories.component';
import {ListQuestionByChecklistComponent} from './components/question/list-question-by-checklist/list-question-by-checklist.component';
import {CategoryByIdComponent} from './components/categories/category-by-id/category-by-id.component';
import {CitiesComponent} from './components/cities/cities.component';
import {CityByIdComponent} from './components/cities/city-by-id/city-by-id.component';
import {NewCityComponent} from './components/cities/new-city/new-city.component';
import {EditCityComponent} from './components/cities/edit-city/edit-city.component';
import {ListCitiesComponent} from './components/cities/list-cities/list-cities.component';
import {VerificationsComponent} from './components/verifications/verifications.component';
import {ListVerificationsComponent} from './components/verifications/list-verifications/list-verifications.component';
import {ViewVerificationComponent} from './components/verifications/view-verification/view-verification.component';
import {ChecklistByIdComponent} from './components/checklist/checklist-by-id/checklist-by-id.component';
import {ReportsLogisticsComponent} from './components/reports-logistics/reports-logistics.component';
import {IndicatorsByVehicleComponent} from './components/reports-logistics/indicators-by-vehicle/indicators-by-vehicle.component';
import {IndicatorsByVehicleDailyComponent} from './components/reports-logistics/indicators-by-vehicle/indicators-by-vehicle-daily/indicators-by-vehicle-daily.component';
import {IndicatorsByVehicleWeeklyComponent} from './components/reports-logistics/indicators-by-vehicle/indicators-by-vehicle-weekly/indicators-by-vehicle-weekly.component';
import {IndicatorsByVehicleYearlyComponent} from './components/reports-logistics/indicators-by-vehicle/indicators-by-vehicle-yearly/indicators-by-vehicle-yearly.component';
import {IndicatorsByVehicleMonthlyComponent} from './components/reports-logistics/indicators-by-vehicle/indicators-by-vehicle-monthly/indicators-by-vehicle-monthly.component';
import {VehicleByIdComponent} from './components/vehicles/vehicle-by-id/vehicle-by-id.component';

@NgModule({
  declarations: [
    RoutesComponent,
    TripsComponent,
    VehiclesComponent,
    NewVehicleComponent,
    EditVehicleComponent,
    ListVehiclesComponent,
    BrandsComponent,
    NewBrandComponent,
    EditBrandComponent,
    ListBrandsComponent,
    BrandByIdComponent,
    NewRouteComponent,
    EditRouteComponent,
    ListRoutesComponent,
    NewTripComponent,
    ListTripsComponent,
    EditTripComponent,
    RouteByIdComponent,
    ChecklistComponent,
    NewChecklistComponent,
    EditChecklistComponent,
    ListChecklistComponent,
    QuestionComponent,
    NewQuestionComponent,
    EditQuestionComponent,
    ListQuestionComponent,
    AnswerComponent,
    CategoriesComponent,
    NewCategoryComponent,
    EditCategoryComponent,
    ListCategoriesComponent,
    ListQuestionByChecklistComponent,
    CategoryByIdComponent,
    CitiesComponent,
    CityByIdComponent,
    NewCityComponent,
    EditCityComponent,
    ListCitiesComponent,
    VerificationsComponent,
    ListVerificationsComponent,
    ViewVerificationComponent,
    ChecklistByIdComponent,
    ReportsLogisticsComponent,
    IndicatorsByVehicleComponent,
    IndicatorsByVehicleDailyComponent,
    IndicatorsByVehicleWeeklyComponent,
    IndicatorsByVehicleYearlyComponent,
    IndicatorsByVehicleMonthlyComponent,
    VehicleByIdComponent,
  ],
  imports: [
    CommonModule,
    LogisticsRoutingModule,
    DashboardModule,
    RrhhModule,
    ReactiveFormsModule,
    FormsModule,
    NgbNavModule,
    NgbPaginationModule,
  ]
})
export class LogisticsModule {
}
