// src/app/leave-form/leave-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, PatternValidator, Validators, ReactiveFormsModule } from '@angular/forms';
import { Leave } from '../leave.model';
import { LeaveService } from '../leave.service';
import { Router, RouterModule, Routes } from '@angular/router';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAuthComponent } from '../user-auth/user-auth.component';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';





@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.css'],
})

export class LeaveFormComponent {
   
  [x: string]: any;
  leaveForm: FormGroup


 

  constructor(private fb: FormBuilder, private leaveService: LeaveService, private router: Router) {
    this.leaveForm = this.fb.group({
      name: ['', Validators.required,Validators.pattern('(?=.*[a-z])') ],
      leave_type: ['', Validators.required,],
      from_date: ['', Validators.required,],
      to_date: ['', Validators.required,],
      team_name: ['', Validators.required, ],
      reporter: ['', Validators.required, ],
      sick_leaves_file: ['',Validators.required,], 
    });
    }

    static add() {
      return 100;
    }
  
    static oddeven(a: number) {
      if (a % 2 == 0) {
        return 'even'
      }
      else {
        return 'odd'
      }
    }


   
 
  onFileSelected(string: any): void { 
    this.sick_leaves_file = this.event.onFileSelected;
  
    const reader = new FileReader();
    reader.onload = () => {
      this.sick_leaves_file = reader.result;
    };
    reader.readAsText(this.target.file[0]);
    this.sick_leaves_file = reader.result;
  }
  
  tableData: boolean = true;

  tableBtn: boolean = true;

 

  showTable() {

    this.tableData = false;

    this.tableBtn = false;
    this.router.navigateByUrl('/user-auth');

  }
  

  onSubmit(): void {

    if (this.leaveForm.valid && (this.leaveForm.get('from_date')?.value < this.leaveForm.get('to_date')?.value)) 
   {
     const leaveData: Leave = this.leaveForm.value;
      this.leaveService.postLeave(leaveData).subscribe((response) => {
        console.log('Leave request for sick submitted successfully', response);
        // Clear the form after submission if needed
        this.leaveForm.reset();
      });
    } 
    else if(this.leaveForm.get("sick_leaves_file")?.value == "" || this.leaveForm.get("leave_type")?.value != 'Sickleave'){
      const leaveData: Leave = this.leaveForm.value;
      this.leaveService.postLeave(leaveData).subscribe((response) => {
        console.log('Leave request submitted successfully', response);
        // Clear the form after submission if needed
        this.leaveForm.reset();
       } );
       alert('leave request submitted successfully');
    }
    else {
      alert('please enter valid date format !!');
      // Handle form validation errors
    }
  }

}


