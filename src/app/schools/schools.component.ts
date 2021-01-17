import { Component, OnInit } from '@angular/core';
import { School } from '../models/School';
import { SchoolService } from '../services/school.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {

  constructor(private _schoolService: SchoolService) { }

  schools: School[];
  ngOnInit(): void {
    this.handleGetSchools()
  }

  handleGetSchools() {
    this._schoolService.getAllSchools()
      .subscribe(schools => {
        this.schools = schools['payload']['docs'];
        console.log(this.schools);
      });
  }

  handleDelete(_id: string) {
    // alert(_id)
    this._schoolService.deleteSchool(_id)
      .subscribe(
        data => {
          console.log(data)
          this.handleGetSchools()
        },
        error => console.log(error)
      )
  }

}
