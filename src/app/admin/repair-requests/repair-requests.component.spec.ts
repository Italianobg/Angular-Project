import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairRequestsComponent } from './repair-requests.component';

describe('RepairRequestsComponent', () => {
  let component: RepairRequestsComponent;
  let fixture: ComponentFixture<RepairRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
