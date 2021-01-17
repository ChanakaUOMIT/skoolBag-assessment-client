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
  showModal = false;
  showSpinner = "";

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
    this._schoolService.createSchool(schoolDto).subscribe(
      data => {
        console.log("createSchool : ", data)
        this.handleGetSchools()
      },
      error => console.log(error)
    );
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

  handleUpdate(_id: string) {
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
