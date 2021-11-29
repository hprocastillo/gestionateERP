import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../modules/auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent {
  collapsed = true;

  constructor(public authSvc: AuthService, private router: Router) {
  }

  async logout() {
    try {
      await this.authSvc.logout();
      await this.router.navigate(['/auth/login']);
      this.collapsed = true;
      console.log('You are logout');
    } catch (error) {
      console.log(error);
    }
  }
}
