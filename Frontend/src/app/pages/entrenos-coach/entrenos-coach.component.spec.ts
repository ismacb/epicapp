import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrenosCoachComponent } from './entrenos-coach.component';

describe('EntrenosCoachComponent', () => {
  let component: EntrenosCoachComponent;
  let fixture: ComponentFixture<EntrenosCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrenosCoachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrenosCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
