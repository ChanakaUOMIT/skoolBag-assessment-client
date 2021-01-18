import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsHeaderComponent } from './schools-header.component';

describe('SchoolsHeaderComponent', () => {
  let component: SchoolsHeaderComponent;
  let fixture: ComponentFixture<SchoolsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
