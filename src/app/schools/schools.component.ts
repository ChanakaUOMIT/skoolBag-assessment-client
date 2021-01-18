import { Component, OnInit } from '@angular/core';
import { School } from '../models/School';
import { SchoolService } from '../services/school.service';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {
  form: any;
  searchForm: any;
  schools: School[];
  showSpinner = "";
  isUpdate = false
  selectedSchoolID = null
  pagination = null
  selectedSchool = null
  tempScl = []

  page = 1;
  constructor(
    private _schoolService: SchoolService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      registedStudents: ["", Validators.required],
      street: ["", Validators.required],
      suburb: ["", Validators.required],
      postcode: ["", Validators.required],
      state: ["", Validators.required],

    });

    this.searchForm = this.fb.group({
      keyword: ["", Validators.required],

    });
  }


  ngOnInit(): void {
    this.handleGetSchools()
  }

  ngOnDestroy(): void {
    this.pagination = null
  }

  handleGetSchools(page = 1) {
    if (this.pagination == null || this.pagination.totalPages >= page)
      this._schoolService.getAllSchools(page)
        .subscribe(schools => {
          this.schools = [...this.tempScl, ...schools['payload']['docs']];
          this.tempScl = this.schools
          this.pagination = {
            page: schools['payload']['page'],
            nextPage: schools['payload']['nextPage'],
            currentPage: schools['payload']['currentPage'],
            pagingCounter: schools['payload']['pagingCounter'],
            prevPage: schools['payload']['prevPage'],
            totalDocs: schools['payload']['totalDocs'],
            totalPages: schools['payload']['totalPages'],
            hasNextPage: schools['payload']['hasNextPage'],
            hasPrevPage: schools['payload']['hasPrevPage']
          }
          console.log("this.schools ", this.schools);
          console.log("pagination ", this.pagination);

        });
  }

  handleSearchSchools(form: any) {
    console.log("form.value ", form.value);
    this._schoolService.searchSchool(form.value.keyword)
      .subscribe(schools => {
        this.schools = schools['payload']['docs'];
        this.pagination = {
          page: schools['payload']['page'],
          nextPage: schools['payload']['nextPage'],
          currentPage: schools['payload']['currentPage'],
          pagingCounter: schools['payload']['pagingCounter'],
          prevPage: schools['payload']['prevPage'],
          totalDocs: schools['payload']['totalDocs'],
          totalPages: schools['payload']['totalPages'],
          hasNextPage: schools['payload']['hasNextPage'],
          hasPrevPage: schools['payload']['hasPrevPage']
        }
        console.log(this.schools);
        console.log("pagination ", this.pagination);

      },
        error => console.log(error)
      );
  }

  clearSearchHandler() {
    this.searchForm.reset();
    this.handleGetSchools()

  }

  handleDelete() {
    this._schoolService.deleteSchool(this.selectedSchool._id)
      .subscribe(
        data => {
          console.log(data)
          this.handleGetSchools()
          this.selectedSchool = null
        },
        error => console.log(error)
      )
  }

  deleteConfiramtionHandler(school: any) {
    this.selectedSchool = school
  }

  deleteCancelHandler() {
    this.selectedSchool = null
  }
  handleCreateSchool() {
    this.form.reset();
    this.isUpdate = false
    this.selectedSchoolID = null
  }

  handleUpdate(school: any) {
    console.log("SchoolsComponent ~ handleUpdate ", school)

    this.isUpdate = true
    this.selectedSchoolID = school._id
    this.form = this.fb.group({
      name: this.fb.control(school.name, Validators.required),
      registedStudents: this.fb.control(school.registedStudents, Validators.required),
      street: this.fb.control(school.address.street, Validators.required),
      suburb: this.fb.control(school.address.suburb, Validators.required),
      postcode: this.fb.control(school.address.postcode, Validators.required),
      state: this.fb.control(school.address.state, Validators.required),


    });
  }


}
