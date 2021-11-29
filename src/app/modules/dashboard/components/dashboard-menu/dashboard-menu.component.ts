import {Component, Input} from '@angular/core';
import firebase from "firebase";
import User = firebase.User;

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss']
})
export class DashboardMenuComponent {
  //Inputs and Outputs
  @Input() user = {} as User;
}
