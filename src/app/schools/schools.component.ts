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
  schools: School[];
  showSpinner = "";
  isUpdate = false
  selectedSchoolID = null
  pagination = null
  selectedSchool = null

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

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
  }


  ngOnInit(): void {
    this.handleGetSchools()
  }

  onSubmit(form: any) {
    this.showSpinner = "true";
    console.log("form.value ", form.value);
    let schoolDto = {
      name: form.value.name,
      registedStudents: form.value.registedStudents,
      address: {
        street: form.value.street,
        suburb: form.value.suburb,
        postcode: form.value.postcode,
        state: form.value.state,
      },

    }
    if (this.isUpdate) {
      this._schoolService.updateSchool(this.selectedSchoolID, schoolDto).subscribe(
        data => {
          console.log("updateSchool : ", data)
          this.handleGetSchools()
        },
        error => console.log(error)
      );
    } else {
      console.log("createSchool : ")
      this._schoolService.createSchool(schoolDto).subscribe(
        data => {
          console.log("createSchool : ", data)
          this.handleGetSchools()
        },
        error => console.log(error)
      );
    }

    this.form.reset();
  }

  handleGetSchools() {
    this._schoolService.getAllSchools()
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

      });
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
    this.isUpdate = true
    this.selectedSchoolID = school._id
    console.log("SchoolsComponent ~ handleUpdate ", school)
    this.form = this.fb.group({
      name: this.fb.control(school.name, Validators.required),
      registedStudents: this.fb.control(school.registedStudents, Validators.required),
      street: this.fb.control(school.address.street, Validators.required),
      suburb: this.fb.control(school.address.suburb, Validators.required),
      postcode: this.fb.control(school.address.postcode, Validators.required),
      state: this.fb.control(school.address.state, Validators.required),


    });
    // alert(_id)
    // this._schoolService.deleteSchool(_id)
    //   .subscribe(
    //     data => {
    //       console.log(data)
    //       this.handleGetSchools()
    //     },
    //     error => console.log(error)
    //   )
  }


  addSchoolHandler() {
    // alert(_id)
    console.log("new")

    // this._schoolService.deleteSchool(_id)
    //   .subscribe(
    //     data => {
    //       console.log(data)
    //       this.handleGetSchools()
    //     },
    //     error => console.log(error)
    //   )
  }

  get name() {
    return this.form.get("name");
  }
  get registedStudents() {
    return this.form.get("registedStudents");
  }
  get street() {
    return this.form.get("street");
  }
  get suburb() {
    return this.form.get("suburb");
  }
  get state() {
    return this.form.get("state");
  }
  get postcode() {
    return this.form.get("postcode");
  }
  handlePageChange(event): void {
    console.log("SchoolsComponent ~ handlePageChange ~ event", event)
    this.page = event;
    // this.retrieveTutorials();
  }

  handlePageSizeChange(event): void {
    console.log("SchoolsComponent ~ handlePageSizeChange ~ event", event)

    // this.pageSize = event.target.value;
    // this.page = 1;
    // this.retrieveTutorials();
  }

}
