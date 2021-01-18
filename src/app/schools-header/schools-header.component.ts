import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-schools-header',
  templateUrl: './schools-header.component.html',
  styleUrls: ['./schools-header.component.scss']
})
export class SchoolsHeaderComponent implements OnInit {
  @Input() searchForm: any;
  @Input() selectedSchool: any;
  @Output() handleCreateSchool = new EventEmitter<null>();
  @Output() handleSearchSchools = new EventEmitter<any>();
  @Output() clearSearchHandler = new EventEmitter<null>();

  constructor() { }

  ngOnInit(): void {
  }

  searchHandler(searchForm: any) {
    this.handleSearchSchools.emit(searchForm);
  }

}
