import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Company} from "../../../../dashboard/interfaces/company";
import firebase from "firebase";
import User = firebase.User;

@Component({
  selector: 'app-list-verifications',
  templateUrl: './list-verifications.component.html',
  styleUrls: ['./list-verifications.component.scss']
})
export class ListVerificationsComponent implements OnInit {
  @Input() user = {} as User;
  @Input() company = {} as Company;
  @Output() verificationId = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
