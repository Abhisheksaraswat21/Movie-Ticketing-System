import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowtimeFormComponent } from './admin-showtime-form.component';

describe('AdminShowtimeFormComponent', () => {
  let component: AdminShowtimeFormComponent;
  let fixture: ComponentFixture<AdminShowtimeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminShowtimeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminShowtimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
