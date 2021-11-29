import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
//Components
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {DashboardMenuComponent} from "./components/dashboard-menu/dashboard-menu.component";
import {DashboardHeaderComponent} from "./components/dashboard-header/dashboard-header.component";
import {DashboardNavbarComponent} from "./components/dashboard-navbar/dashboard-navbar.component";
import {HomeComponent} from './components/home/home.component';
import {NgbAccordionModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {NewCompanyComponent} from './components/company/new-company/new-company.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {NotificationsBadgeComponent} from './components/notifications/notifications-badge/notifications-badge.component';
import {ListHistoricalNotificationsComponent} from './components/notifications/list-historical-notifications/list-historical-notifications.component';
import {ListCurrentNotificationsComponent} from './components/notifications/list-current-notifications/list-current-notifications.component';
import {ConfigComponent} from './components/config/config.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardMenuComponent,
    DashboardHeaderComponent,
    DashboardNavbarComponent,
    HomeComponent,
    NewCompanyComponent,
    ToolbarComponent,
    NotificationsComponent,
    NotificationsBadgeComponent,
    ListHistoricalNotificationsComponent,
    ListCurrentNotificationsComponent,
    ConfigComponent,
  ],
  exports: [
    DashboardComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbPaginationModule
  ]
})
export class DashboardModule {
}
