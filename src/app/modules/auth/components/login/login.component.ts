import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authSvc: AuthService, private router: Router) {
  }

  async loginGoogle() {
    try {
      await this.authSvc.loginGoogle();
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      console.log(error);
    }
  }
}
