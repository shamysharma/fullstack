import { Component, OnInit, ViewChild } from '@angular/core';
import { Leave, division, manager, topfive } from '../leave.model';
import { LeaveService } from '../leave.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModel } from '@angular/forms';
import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { FormsModule } from '@angular/forms';
import { ManagerDataComponent } from '../manager-data/manager-data.component';
import { Chart, ChartData, ChartType } from 'chart.js/auto';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { BarControllerChartOptions } from 'chart.js/auto';
import { BarControllerDatasetOptions } from 'chart.js/auto';
import { ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-view-visuals',
  templateUrl: './view-visuals.component.html',
  styleUrls: ['./view-visuals.component.css']
})
export class ViewVisualsComponent {

  topFivedata: topfive[]=[];
  managerData: manager[]=[];
  barChartLegend = true;
  barChartPlugins = [];
  router: any;
  data: division[]=[];




  
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'alex gonzalex', 'Barbara olson', 'Benjamin Jensen ', 'Brenda jefferson', 'Curtis Gardner',
     'David Davis', 'Juan Myers DVM', 'Rebecca davis', 'Sabrina Martin', 'Tammy Carey' ],
    datasets: [
      { data: [ 8, 8, 11, 11, 7, 10, 10, 11, 13, 11 ], label: 'Count' }
    ]
    
  };
  
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
  chart: Chart<"pie", number[], string> | undefined;


constructor(private leaveService: LeaveService){}
   ngOnInit(){
    this.createChart();
    // this.getManager();
    this.loadtopfiveData();
  }
  
  // getManager(){
  //   this.leaveService.getPerManager().subscribe((data)=>{
  //   this.managerData = data;
  //   this.barChartData = this.managerData;
  //   });
  // }

  
  loadtopfiveData(): void{
    
    this.leaveService.getOpFive().subscribe((data: topfive[]) => {
    
      this.topFivedata=data;
      
    });
 
  }

  createChart(){
    
    this.leaveService.teamdivision().subscribe((data:division[]) =>
    {
       this.data = data;
    }
    );
    const labels = this.data.map((item: any) => item.Reporter);  // x axis
    const values = this.data.map((item: any) => item.Count);     // y axis


    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart
     
      data: {// values on X-Axis
        labels: ['AI-Sick leaves', 'AI-Casual leave','AI-Earned leave','IT-Sick Leave','IT-Earned leave','IT-Casual leave', ],
	       datasets: [{
    label: 'Top 2 teams',
    data: [129, 109, 133, 133, 126, 132],
    backgroundColor: [
      'red',
      'pink',
      'green',
			'yellow',
      'orange',
      'blue',			
    ],
    hoverOffset: 4
  }],
      },
      options: {
        aspectRatio:2.5
      }

    });
  }


}

