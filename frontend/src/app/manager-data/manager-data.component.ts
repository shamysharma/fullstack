import { Component, OnInit } from '@angular/core';
import { Leave, Notifi } from '../leave.model';
import { LeaveService } from '../leave.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModel } from '@angular/forms';
import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ViewVisualsComponent } from '../view-visuals/view-visuals.component';


@Component({
  selector: 'app-manager-data',
  templateUrl: './manager-data.component.html',
  styleUrls: ['./manager-data.component.css']
})
export class ManagerDataComponent implements OnInit {
notifiData: Notifi[]=[];
router: any;

constructor(private leaveService: LeaveService){}
   ngOnInit(){
    console.log("1");
    this.loadnotifiData();
    console.log("2");
  }
  loadnotifiData(): void{
    console.log("3");
    this.leaveService.getnotify().subscribe((data: Notifi[]) => {
    console.log("4");
      this.notifiData=data;
    console.log("5");  
    });
  }

//   onClick (): void { 
//     this.myfunc
//     alert("Leave Request Successfully Accepted");
//  }
//  function myfunc2(): void{
//      alert("Leave Request Successfully Rejected");
//      document.getElementById("btn2").innerHTML("Rejected")
//  }

}



