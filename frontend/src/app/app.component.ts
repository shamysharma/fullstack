import { style } from '@angular/animations';
import { Component, OnInit, Input, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { LeaveTableComponent } from './leave-table/leave-table.component';
import { ManagerDataComponent } from './manager-data/manager-data.component';
import { ViewVisualsComponent } from './view-visuals/view-visuals.component';
import { RouterLink } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js/auto';
import { BarController } from 'chart.js/auto';
import { BarElement } from 'chart.js/auto';
import { BarControllerChartOptions } from 'chart.js/auto';
import { BarControllerDatasetOptions } from 'chart.js/auto';
import { ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title= 'frontend';
  
}


