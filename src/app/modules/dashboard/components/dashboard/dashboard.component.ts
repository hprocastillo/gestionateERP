import {Component, Input, OnInit} from '@angular/core';
import firebase from "firebase";
import User = firebase.User;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Inputs and Outputs
  @Input() user = {} as User

  constructor() {
  }

  ngOnInit(): void {
  }

}
