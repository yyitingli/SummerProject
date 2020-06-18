import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Department} from 'src/app/models/department-model';
import {Observable} from 'rxjs';

import {Subject} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DepartmentService{

  constructor(private http : HttpClient) { }

  formData : Department;

  readonly APIUrl = "http://localhost:4200/api";


  getDepList(): Observable<Department[]> {
  	return this.http.get<Department[]>('https://run.mocky.io/v3/6e245b7a-749b-4964-bd85-2e561efda086');
  }

  addDepartment(dep:Department){
  	return this.http.post('https://run.mocky.io/v3/6e245b7a-749b-4964-bd85-2e561efda086',dep);
  }

  deleteDepartment(id: number){
  	return this.http.delete('https://run.mocky.io/v3/6e245b7a-749b-4964-bd85-2e561efda086'+'id');
  }

  updateDepartment(dep: Department){
  	return this.http.put('https://run.mocky.io/v3/6e245b7a-749b-4964-bd85-2e561efda086','dep');
  }

  private _listners = new Subject<any>();
  listen(): Observable<any>{
  	return this._listners.asObservable();
  }
  filter(filterBy: string){
  	this._listners.next(filterBy);
  }


}
