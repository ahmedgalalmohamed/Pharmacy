import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMedicineComponent } from './dialog-medicine.component';

describe('DialogMedicineComponent', () => {
  let component: DialogMedicineComponent;
  let fixture: ComponentFixture<DialogMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMedicineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
