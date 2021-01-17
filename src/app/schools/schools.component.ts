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

  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }

}
