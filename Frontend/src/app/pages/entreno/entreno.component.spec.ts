import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrenoComponent } from './entreno.component';

describe('EntrenoComponent', () => {
  let component: EntrenoComponent;
  let fixture: ComponentFixture<EntrenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrenoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
