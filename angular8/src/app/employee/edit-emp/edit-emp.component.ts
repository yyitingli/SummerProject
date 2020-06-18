import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms'
import { EmployeeService } from 'src/app/services/employee.service';

import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})
export class EditEmpComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<EditEmpComponent>, private service: EmployeeService, private snackBar: MatSnackBar) { }
  public listItems: Array<string> = [];

  ngOnInit() {
    this.dropdownRefresh();
  }

   onClose(){
  	this.dialogbox.close();
  	this.service.filter('Register click');
  }

  dropdownRefresh(){
    this.service.getDepDropDownValues().subscribe(data=>{
        console.log(data);
        data.forEach(element => {
          this.listItems.push(element["DepartmentName"]);
        });
    })
  }

  onSubmit(form: NgForm){ 

    form.value.DOJ = new Date(form.value.DOJ).getFullYear().toString()
        +'-'+(new Date(form.value.DOJ).getMonth() +1).toString()
        +'-'+new Date(form.value.DOJ).getDate().toString();

    this.service.updateEmployee(form.value)
    this.snackBar.open("Succesfully Unpdate", '', 
    {duration: 5000,
    verticalPosition: 'top'})
    this.dialogbox.close();

  }

}