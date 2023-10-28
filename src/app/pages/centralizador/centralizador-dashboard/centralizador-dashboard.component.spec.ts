import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralizadorDashboardComponent } from './centralizador-dashboard.component';

describe('CentralizadorDashboardComponent', () => {
  let component: CentralizadorDashboardComponent;
  let fixture: ComponentFixture<CentralizadorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentralizadorDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralizadorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
