import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {NotificationsComponent} from "./components/notifications/notifications.component";
import {ConfigComponent} from "./components/config/config.component";
import {AuthGuard} from "../auth/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    canActivate:[AuthGuard],
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'notifications/:userId', component: NotificationsComponent},
      {path: 'config/:userId', component: ConfigComponent},
      {path: '**', redirectTo: 'home'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
