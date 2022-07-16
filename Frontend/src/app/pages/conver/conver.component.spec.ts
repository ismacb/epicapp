import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverComponent } from './conver.component';

describe('ConverComponent', () => {
  let component: ConverComponent;
  let fixture: ComponentFixture<ConverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
