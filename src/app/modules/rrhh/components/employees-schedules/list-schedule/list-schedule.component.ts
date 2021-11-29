import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list-schedule',
  templateUrl: './list-schedule.component.html',
  styleUrls: ['./list-schedule.component.scss']
})
export class ListScheduleComponent implements OnInit {
  @Output() add = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
  goNew(event: any) {
    this.add.emit(event.value);
  }
}
