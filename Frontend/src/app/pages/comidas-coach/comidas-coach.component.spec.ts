import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComidasCoachComponent } from './comidas-coach.component';

describe('ComidasCoachComponent', () => {
  let component: ComidasCoachComponent;
  let fixture: ComponentFixture<ComidasCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComidasCoachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComidasCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
