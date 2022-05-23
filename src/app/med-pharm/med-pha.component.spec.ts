import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedPhaComponent } from './med-pha.component';

describe('AboutUsComponent', () => {
  let component: MedPhaComponent;
  let fixture: ComponentFixture<MedPhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedPhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedPhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
