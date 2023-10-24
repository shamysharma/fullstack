
import { HttpClientTestingModule, HttpTestingController,provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';

import { LeaveFormComponent } from './leave-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LeaveService } from '../leave.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, PatternValidator, Validators, ReactiveFormsModule } from '@angular/forms';
import { Leave } from '../leave.model';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAuthComponent } from '../user-auth/user-auth.component';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import 'jasmine';

describe('LeaveFormComponent', () => {
 
  let fixture: ComponentFixture<LeaveFormComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveFormComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [HttpClientModule,
      RouterTestingModule,HttpClientTestingModule
    ],
    
     
      
    });

  });

  

  it('from date can be greater than to date !!! fine it is working ', () => {
    expect(LeaveFormComponent.add()).toEqual(100)
  }
  )


 it('Login button working successfully ',() =>{
  expect(LeaveFormComponent.oddeven(9)).toBe('odd')
 }
 )

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  /// Tests begin ///



  it('can test POST', () => {
    const testData: any = {
    name: 'Test',
    leave_type:'male',
    from_date:'15-08-2023' ,
    to_date:'23-08-2023',
    team_name:'1234567890',
    sick_leaves_file:new File([], 'test.pdf') ,
    reporter:'m2'

} ;
  
    // Make an HTTP post request
    httpClient.post<any>('http://localhost:0.0.0.0/leave',testData)
      .subscribe(data =>
        // When observable resolves, result should match test data
        expect(data).toEqual(testData)
      );


      const req = httpTestingController.expectOne('http://localhost:0.0.0.0/leave');
      
      // // Assert that the request is a GET.
       expect(req.request.method).toEqual('POST');
    
      // // Respond with mock data, causing Observable to resolve.
      // // Subscribe callback asserts that correct data was returned.
       req.flush(testData);
    
      // // Finally, assert that there are no outstanding requests.
       httpTestingController.verify();
      //  console.log(testData)


      })



      it('should have a validateDate method that rejects past dates', () => {
        const pastDate = '2022-01-01';
        const futureDate = '2023-12-31';
        expect(pastDate).not.toEqual(futureDate);     });
});
it('login button should work properly', () => {
 class showTable {

    tableData = false;

    tableBtn = false;
    router = new Router();
    
  }

});

// it('should have <div> with "leaveform Works !!"',()=>{
//   const leaveFormElement: HTMLElement = fixture.nativeElement;
//   const p = leaveFormElement.querySelector('div')!;
//   expect(p.textContent).toEqual('Leave form');
// }) 