import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditinventoryComponent } from './editinventory.component';

describe('EditinventoryComponent', () => {
  let component: EditinventoryComponent;
  let fixture: ComponentFixture<EditinventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditinventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
