import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee} from 'src/app/models/employee-model';
import {Observable} from 'rxjs';
import {MatTableDataSource,MatSort} from '@angular/material';

import { Department } from '../models/department-model';

import {Subject} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService{

  constructor(private http : HttpClient) { }

  formData : Employee;

  readonly APIUrl = "http://localhost:4200/api";

  listData : MatTableDataSource<any>;

  index: number;




  getEmpList(){ //:Observable<Employee[]> {
   if (this.listData == null )
   		this.listData = new MatTableDataSource([{EmployeeID:1, EmployeeName:"Katie Ginger",Department: "IT", MailID: "KatieGinger@goo.com", DOJ: "2019-1-1"},
  		{EmployeeID:2, EmployeeName:"Grant Parker",Department: "Finance", MailID: "GPaker@goo.com", DOJ: "2019-12-1"},{EmployeeID:3, EmployeeName:"Haley Tank",Department: "Human Resource", MailID: "HaleyT@goo.com", DOJ: "2019-2-1"}])
  	

  return this.listData;
  	
  	//this.http.get<Employee[]>('https://run.mocky.io/v3/9175e4f0-d324-4345-9994-4723cf091750');
  }

  addEmployee(emp:Employee){

  	this.listData.data.push({
  	EmployeeID: emp.EmployeeID, 
  	EmployeeName: emp.EmployeeName.toString(),
  	Department: emp.Department.toString(),
  	MailID: emp.MailID.toString() , 
  	DOJ: emp.DOJ
  	});
  }

  deleteEmployee(id: number){
  	this.listData.data.splice( this.listData.data.findIndex(x => x.EmployeeID === id,1),1);

  }

  updateEmployee(emp: Employee){
  	this.index = this.listData.data.findIndex(x => x.EmployeeID === emp.EmployeeID,1);

  	this.listData.data.splice( this.index ,1, 
  	{
  		EmployeeID: emp.EmployeeID, 
  		EmployeeName: emp.EmployeeName.toString(),
  		Department: emp.Department.toString(),
  		MailID: emp.MailID.toString() , 
  		DOJ: emp.DOJ
  	});

  }

  getDepDropDownValues():Observable<any>{
    return this.http.get<Department[]>('https://run.mocky.io/v3/6e245b7a-749b-4964-bd85-2e561efda086');
  }

  private _listners = new Subject<any>();
  listen(): Observable<any>{
  	return this._listners.asObservable();
  }
  filter(filterBy: string){
  	this._listners.next(filterBy);
  }


}
