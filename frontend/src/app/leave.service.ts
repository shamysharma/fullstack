// src/app/leave.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leave, Notifi, division, manager, topfive } from './leave.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private apiUrl = 'http://localhost:8086';


  constructor(private http: HttpClient) {}
  

  postLeave(leaveForm: Leave): Observable<Leave> {
    console.log("10:", leaveForm)
    return this.http.post<Leave>(`${this.apiUrl}/leave`, leaveForm);
  }

  getLeaves(): Observable<Leave[]> {
    return this.http.get<Leave[]>(`${this.apiUrl}/leaves`);
  }

  getnotify(): Observable<Notifi[]> {
    return this.http.get<Notifi[]>(`${this.apiUrl}/notify`);
  }

  getOpFive(): Observable<topfive[]> {  
    return this.http.get<topfive[]>(`${this.apiUrl}/top5`);
  }
  
  getPerManager(): Observable<manager[]>{
    return this.http.get<manager[]>(`${this.apiUrl}/pmanager`);
  }
  
  teamdivision(): Observable<division[]>{
   return this.http.get<division[]>(`${this.apiUrl}/teamdivision`);
  }
}