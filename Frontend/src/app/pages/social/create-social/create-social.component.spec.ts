import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSocialComponent } from './create-social.component';

describe('CreateSocialComponent', () => {
  let component: CreateSocialComponent;
  let fixture: ComponentFixture<CreateSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
