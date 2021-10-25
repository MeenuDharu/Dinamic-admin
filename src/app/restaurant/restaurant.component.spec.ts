import { ComponentFixture, TestBed } from '@angular/core/testing';

import { restaurantComponent } from './restaurant.component';

describe('restaurantComponent', () => {
  let component: restaurantComponent;
  let fixture: ComponentFixture<restaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ restaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(restaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
