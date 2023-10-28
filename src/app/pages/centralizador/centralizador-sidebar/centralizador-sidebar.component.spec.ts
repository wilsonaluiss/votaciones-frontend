import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralizadorSidebarComponent } from './centralizador-sidebar.component';

describe('CentralizadorSidebarComponent', () => {
  let component: CentralizadorSidebarComponent;
  let fixture: ComponentFixture<CentralizadorSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentralizadorSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralizadorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
