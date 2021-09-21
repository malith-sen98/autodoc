import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQtyComponent } from './add-qty.component';

describe('AddQtyComponent', () => {
  let component: AddQtyComponent;
  let fixture: ComponentFixture<AddQtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQtyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
