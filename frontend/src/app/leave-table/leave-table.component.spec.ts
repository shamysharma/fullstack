import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Data } from '@angular/router';
import { LeaveTableComponent } from './leave-table.component';
import { AppRoutingModule } from '../app-routing.module';

// describe('LeaveTableComponent', () => {
//   let component: LeaveTableComponent;
//   let fixture: ComponentFixture<LeaveTableComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [LeaveTableComponent]
//     });
//     fixture = TestBed.createComponent(LeaveTableComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });



describe('Person Data testing', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule, 
        AppRoutingModule ],
      });
  
      // Inject the http service and test controller for each test
      httpClient = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
    });
    /// Tests begin ///
it('Should generate leaves in given form', () => {});

    it('can test HttpClient.get', () => {
        const testData: any = {
        id: '2',
        name: 'Test',
        leave_type:'male',
        from_date:'15-08-2023' ,
        to_date:'23-08-2023',
        team_name:'1234567890',
        sick_leaves_file:new File([], 'test.pdf') ,
        reporter:'john'
    
    };
      
      //  Make an HTTP GET request
        httpClient.get<any>('http://localhost:0.0.0.0/leaves')
          .subscribe(data =>
            // When observable resolves, result should match test data
            expect(data).toEqual(testData)
          );
      
        // // The following `expectOne()` will match the request's URL.
        // // If no requests or multiple requests matched that URL
        // // `expectOne()` would throw.
        const req = httpTestingController.expectOne('http://localhost:0.0.0.0/leaves');
      
        // // Assert that the request is a GET.
         expect(req.request.method).toEqual('GET');
      
        // // Respond with mock data, causing Observable to resolve.
        // // Subscribe callback asserts that correct data was returned.
         req.flush(testData);
      
        // // Finally, assert that there are no outstanding requests.
         httpTestingController.verify();
        
      });

// it('should', () => {
//   class ngOnInit 
// {
// expect(LeaveTableComponent.length);
// }
// );



  });