import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditComponent } from './add-or-edit.component';

describe('AddOrEditComponent', () => {
  let component: AddOrEditComponent;
  let fixture: ComponentFixture<AddOrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
