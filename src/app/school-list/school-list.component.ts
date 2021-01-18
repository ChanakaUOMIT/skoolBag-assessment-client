import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {
  @Input() schools: any;
  @Input() selectedSchool: any;
  @Output() handleUpdate = new EventEmitter<any>();
  @Output() deleteConfiramtionHandler = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  updateHandler(school: any) {
    this.handleUpdate.emit(school);
  }

  deleteHandler(school: any) {
    this.deleteConfiramtionHandler.emit(school);
  }

}
