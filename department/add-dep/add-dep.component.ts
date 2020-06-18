import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms'
import { DepartmentService } from 'src/app/services/department.service';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-dep',
  templateUrl: './add-dep.component.html',
  styleUrls: ['./add-dep.component.css']
})
export class AddDepComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<AddDepComponent>, private service: DepartmentService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  	this.resetForm();
  }

  resetForm(form?: NgForm){
  	if(form != null)
  	form.resetForm();

  	this.service.formData = { DepartmentID: 0, DepartmentName: ''}
  }

  onClose(){
  	this.dialogbox.close();
  	this.service.filter('Register click');
  }

  onSubmit(form: NgForm){
  	console.log(form.value);
  	this.service.addDepartment(form.value).subscribe(res =>
  	{
  		this.resetForm();
  		this.snackBar.open(res.toString(),'',{duration:3000, verticalPosition: 'top'});
  		//alert(res);

  	});

  }

}
