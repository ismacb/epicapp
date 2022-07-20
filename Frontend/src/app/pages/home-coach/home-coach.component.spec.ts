import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCoachComponent } from './home-coach.component';

describe('HomeCoachComponent', () => {
  let component: HomeCoachComponent;
  let fixture: ComponentFixture<HomeCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCoachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
