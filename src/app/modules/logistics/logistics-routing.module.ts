import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoutesComponent} from "./components/routes/routes.component";
import {TripsComponent} from "./components/trips/trips.component";
import {VehiclesComponent} from "./components/vehicles/vehicles.component";
import {ChecklistComponent} from "./components/checklist/checklist.component";
import {AuthGuard} from "../auth/guards/auth.guard";
import {ReportsLogisticsComponent} from "./components/reports-logistics/reports-logistics.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: 'routes/:id', component: RoutesComponent},
      {path: 'trips/:id', component: TripsComponent},
      {path: 'reports/:id', component: ReportsLogisticsComponent},
      {path: 'vehicles/:id', component: VehiclesComponent},
      {path: 'checklists/:id', component: ChecklistComponent},
      {path: '**', redirectTo: 'routes/:id'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticsRoutingModule {
}
