import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorReportComponent } from './collaborator-report.component';

describe('CollaboratorReportComponent', () => {
  let component: CollaboratorReportComponent;
  let fixture: ComponentFixture<CollaboratorReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
