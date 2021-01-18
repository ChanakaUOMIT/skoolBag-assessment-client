import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-school',
  templateUrl: './delete-school.component.html',
  styleUrls: ['./delete-school.component.scss']
})
export class DeleteSchoolComponent implements OnInit {

  @Input() selectedSchool: any;
  @Output() deleteCancelHandler = new EventEmitter<null>();
  @Output() handleDelete = new EventEmitter<null>();

  constructor() { }

  ngOnInit(): void {
  }

}
