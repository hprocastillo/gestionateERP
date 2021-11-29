import {Component} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
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
      await this.router.navigate(['auth']);
      this.collapsed = true;
    } catch (error) {
      console.log(error);
    }
  }
}
