import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiServiceService } from '../shared/api-service.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  postEmployee:any = [];
  employeeDetails:any=[];
  updateEmployee:any=[];
  empID:any=[];
  testVal:any=[];
  formValue !:FormGroup;
  constructor(private formbuilder:FormBuilder, private postApi:ApiServiceService) {}

  ngOnInit(){
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      phone : [''],
      salary : ['']
    });
    this.getEmployeeDetails();
  }

  onEmpFormSubmit(){
    if(this.formValue.valid){
      console.log(this.formValue.value);
      this.postApi.addEmployee(this.formValue.value).subscribe({
        next:(val)=>{
          alert("Employee added successfully");
          let ref = document.getElementById('close');
          ref?.click();
          this.formValue.reset();
          this.getEmployeeDetails();
        },
        error:(err:any)=>{
          console.error(err);
        }
      })
    }
  }

  getEmployeeDetails(){
    this.postApi.getEmployee().subscribe((input)=>{
      //console.log(input);
      this.employeeDetails=input;
    });
  }

  deleteEmployeeDetails(id:number){
    this.postApi.deleteEmployee(id).subscribe({
      next: (input)=>{
        alert("Employee Deleted!");
        this.getEmployeeDetails();
      },
      error:()=>{
        console.log();
      } 
    })
  }

  openAddEditEmpForm(emp:any, id:number){
    this.formValue.controls['firstName'].setValue(emp.firstName);
    this.formValue.controls['lastName'].setValue(emp.lastName);
    this.formValue.controls['email'].setValue(emp.email);
    this.formValue.controls['phone'].setValue(emp.phone);
    this.formValue.controls['salary'].setValue(emp.salary);
    this.empID=emp.id;
    console.log(this.empID);
  }

  updateEmployeeDetails(emp:any, id:number){
    if(this.formValue.valid){
      this.postApi.updateEmployee(emp, id).subscribe({
        next:(val)=>{
          this.updateEmployee = val;
          console.log(this.updateEmployee.id);
          alert("Employee Updated successfully");
          let ref = document.getElementById('close');
          ref?.click();
          this.formValue.reset();
          this.getEmployeeDetails();
        },
        error:(err:any)=>{
          console.error(err);
        }
      })
    }
  }

  editTest(id:number){
    console.log("Hi",id);
    this.postApi.editEmployee(id).subscribe((input)=>{
      //console.log(input);
      this.testVal=input;
    });
  }

}
