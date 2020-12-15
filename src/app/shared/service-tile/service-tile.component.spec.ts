import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTileComponent } from './service-tile.component';

describe('ServiceTileComponent', () => {
  let component: ServiceTileComponent;
  let fixture: ComponentFixture<ServiceTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
