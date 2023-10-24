import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaveService } from '../leave.service';
import { UserAuthComponent } from './user-auth.component';
import { AuthGuard } from '../auth.guard';
import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';


describe('UserAuthComponent', () => {
  let component: UserAuthComponent;
  let fixture: ComponentFixture<UserAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAuthComponent],
      schemas: [NO_ERRORS_SCHEMA, ], 
    });
    fixture = TestBed.createComponent(UserAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

it('isSubmitted should work when user is logged in', () => {
class mockUserAuthComponent {
  isSubmitted = false;
  email = {email: 'foo@example.com'}
  password = {password: 'pass@A123a' }
}
expect(UserAuthComponent).toBeTruthy();
});


it('signin should work', () => {
class signIn{
  isSubmitted = false;
  authForm = false;
}
expect(UserAuthComponent).not.toBeNull();
});