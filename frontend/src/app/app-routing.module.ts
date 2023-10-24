import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveTableComponent } from './leave-table/leave-table.component';
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { AuthGuard } from './auth.guard';
import { ViewVisualsComponent } from './view-visuals/view-visuals.component'; 
import { ManagerDataComponent } from './manager-data/manager-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { NgChartsModule } from 'ng2-charts';
const routes: Routes = [
  {path: 'leave-form', component:LeaveFormComponent},
  {path: 'user-auth', component:UserAuthComponent},
  {path: 'leave-table', component:LeaveTableComponent, canActivate: [AuthGuard]},
  {path: 'view-visuals', component:ViewVisualsComponent},
  {path: 'manager-data', component:ManagerDataComponent},

];

@NgModule({
  declarations: [LeaveTableComponent, LeaveFormComponent, UserAuthComponent,ManagerDataComponent, ViewVisualsComponent],
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
