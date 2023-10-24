// src/app/leave-table/leave-table.component.ts
import { Component, OnInit } from '@angular/core';
import { Leave } from '../leave.model';
import { LeaveService } from '../leave.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModel } from '@angular/forms';
import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-leave-table',
  templateUrl: './leave-table.component.html',
  styleUrls: ['./leave-table.component.css'],
})
export class LeaveTableComponent implements OnInit {
  leaveData: Leave[] = [];
  router: any;

  constructor(private leaveService: LeaveService) {}

  ngOnInit() {
    this.loadLeaveData();
  }

  loadLeaveData() {
    this.leaveService.getLeaves().subscribe((data: Leave[]) => {
      this.leaveData = data;
    });
  }
}