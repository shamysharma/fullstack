import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgModel } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { BarController } from 'chart.js/auto';
import { BarElement } from 'chart.js/auto';
import { BarControllerChartOptions } from 'chart.js/auto';
import { BarControllerDatasetOptions } from 'chart.js/auto';
import { ChartConfiguration } from 'chart.js/auto';


import { AppComponent } from './app.component';
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { LeaveTableComponent } from './leave-table/leave-table.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { ManagerDataComponent } from './manager-data/manager-data.component';
import { ViewVisualsComponent } from './view-visuals/view-visuals.component';
import { Chart } from 'chart.js/auto';


@NgModule({
  declarations: [AppComponent, LeaveFormComponent, LeaveTableComponent, UserAuthComponent, ManagerDataComponent, ViewVisualsComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule ,HttpClientModule,NgChartsModule,RouterModule.forRoot([
    {path: 'leave-form', component:LeaveFormComponent},
    {path: 'leave-table', component:LeaveTableComponent},
    {path: 'user-auth', component:UserAuthComponent},
    {path: 'view-visuals', component:ViewVisualsComponent},
    {path: 'manager-data', component:ManagerDataComponent}
    
  ])], 
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  
}