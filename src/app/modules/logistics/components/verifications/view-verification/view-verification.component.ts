import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Company} from "../../../../dashboard/interfaces/company";
import {Answer} from "../../../interfaces/checklist";
import firebase from "firebase";
import User = firebase.User;

@Component({
  selector: 'app-view-verification',
  templateUrl: './view-verification.component.html',
  styleUrls: ['./view-verification.component.scss']
})
export class ViewVerificationComponent implements OnInit {
  @Input() user = {} as User;
  @Input() company = {} as Company;
  @Input() verificationId = {} as Answer;
  @Output() back = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

}
