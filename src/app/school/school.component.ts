import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SchoolService } from '../services/school.service';
import { FormBuilder, Validators } from "@angular/forms";
import { School } from '../models/School';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {
  searchForm: any;
  schools: School[];
  showSpinner = "";
  pagination = null
  @Input() form: any;
  @Input() isUpdate: any;
  @Input() selectedSchool: any;
  @Input() selectedSchoolID: any;
  @Output() handleGetSchools = new EventEmitter<null>();

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];


  constructor(
    private _schoolService: SchoolService,
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
          this.handleGetSchools.emit()
        },
        error => console.log(error)
      );
    } else {
      console.log("createSchool : ")
      this._schoolService.createSchool(schoolDto).subscribe(
        data => {
          console.log("createSchool : ", data)
          this.handleGetSchools.emit()
        },
        error => console.log(error)
      );
    }

    this.form.reset();
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

}
