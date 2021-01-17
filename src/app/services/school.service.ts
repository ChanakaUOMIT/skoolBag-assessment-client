import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  base_url = environment.backend_url;
  constructor(private _http: HttpClient) { }

  getAllSchools() {
    return this._http.get(this.base_url);
  }

  deleteSchool(_id: string) {
    console.log("deleteSchool ~ _id", _id)
    console.log("deleteSchool ~ _id", this.base_url + `${_id}`)


    return this._http.delete(this.base_url + `${_id}`);
  }
}
