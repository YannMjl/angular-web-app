import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayByDateComponent } from './display-by-date.component';

describe('DisplayByDateComponent', () => {
  let component: DisplayByDateComponent;
  let fixture: ComponentFixture<DisplayByDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayByDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
