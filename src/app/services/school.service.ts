import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  base_url = environment.backend_url;
  constructor(private _http: HttpClient) { }

  createSchool(school: any) {
    return this._http.post(this.base_url, school);
  }

  getAllSchools(page) {
    return this._http.get(this.base_url + `?page=${page}`);
  }

  updateSchool(_id: string, school: any) {
    return this._http.put(this.base_url + `/${_id}`, school);
  }

  deleteSchool(_id: string) {
    return this._http.delete(this.base_url + `/${_id}`);
  }

  searchSchool(keyword: string) {
    return this._http.get(this.base_url + `/search?keyword=${keyword}`);
  }


}
