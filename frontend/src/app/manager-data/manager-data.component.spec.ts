import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDataComponent } from './manager-data.component';

describe('ManagerDataComponent', () => {
  let component: ManagerDataComponent;
  let fixture: ComponentFixture<ManagerDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerDataComponent]
    });
    fixture = TestBed.createComponent(ManagerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
