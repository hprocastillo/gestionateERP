import {Component} from '@angular/core';
import {AuthService} from "./modules/auth/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'erp';

  constructor(public authSvc: AuthService) {
  }
}
