import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// const nisPackage = require("../../../package.json");

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {
  @Input() schools: any;
  @Input() page: any;
  @Input() selectedSchool: any;
  @Output() handleUpdate = new EventEmitter<any>();
  @Output() deleteConfiramtionHandler = new EventEmitter<any>();
  @Output() handleGetSchools = new EventEmitter<any>();


  array = [];
  sum = 100;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = "";
  modalOpen = false;

  // nisVersion = nisPackage.dependencies["ngx-infinite-scroll"];
  constructor(
  ) {
    this.appendItems(0, this.sum);

  }

  ngOnInit() {
  }

  updateHandler(school: any) {
    this.handleUpdate.emit(school);
  }

  deleteHandler(school: any) {
    this.deleteConfiramtionHandler.emit(school);
  }


  addItems(startIndex, endIndex, _method) {
    console.log("Add Items")
    let isInfinite = true
    this.handleGetSchools.emit({ page: ++this.page, isInfinite: isInfinite });
  }

  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, "push");
  }

  prependItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, "unshift");
  }

  onScrollDown(ev) {
    console.log("scrolled down!!", ev);

    // add another 20 items
    const start = this.sum;
    this.sum += 20;
    this.appendItems(start, this.sum);

    this.direction = "down";
  }

  onUp(ev) {
    console.log("scrolled up!", ev);
    const start = this.sum;
    this.sum += 20;
    this.prependItems(start, this.sum);

    this.direction = "up";
  }
  // generateWord() {
  //   return chance.word();
  // }

  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }


}
