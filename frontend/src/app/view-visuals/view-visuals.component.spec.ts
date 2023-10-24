import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVisualsComponent } from './view-visuals.component';

describe('ViewVisualsComponent', () => {
  let component: ViewVisualsComponent;
  let fixture: ComponentFixture<ViewVisualsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewVisualsComponent]
    });
    fixture = TestBed.createComponent(ViewVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
