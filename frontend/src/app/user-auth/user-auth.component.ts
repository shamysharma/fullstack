import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { LeaveTableComponent } from '../leave-table/leave-table.component';
import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';



@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  
  authForm!: FormGroup;
  isSubmitted = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
    email: ['', Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[.@])(?=.*[0-9])'), Validators.email ],
    password: ['', Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]
  
   });
  } 

  

  get formControls(){ return this.authForm.controls; }

  signIn(){
    this.isSubmitted = true;
    if(this.authForm.invalid){
      return;
  }
  
  this.authService.signIn(this.authForm.value);
  this.router.navigateByUrl('/leave-table');


  } 


}
