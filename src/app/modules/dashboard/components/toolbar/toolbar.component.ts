import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  //Button Add New
  @Input() btnAdd: boolean | any;
  @Output() add = new EventEmitter<boolean>();

  //Button Export
  @Input() btnExport: boolean | any;
  @Output() export = new EventEmitter<boolean>();

  //Button Print
  @Input() btnPrint: boolean | any;
  @Output() print = new EventEmitter<boolean>();

  //Button Back
  @Input() btnBack: boolean | any;
  @Output() back = new EventEmitter<boolean>();

  getNew() {
    this.add.emit(true);
  }

  getExport() {
    this.export.emit(true);
  }

  getBack() {
    this.back.emit(true);
  }

  getPrint() {
    this.print.emit(true);
  }
}
