import { ComponentFixture, TestBed } from '@angular/core/testing';

import { restaurantThemeComponent } from './restaurant-theme.component';

describe('restaurantThemeComponent', () => {
  let component: restaurantThemeComponent;
  let fixture: ComponentFixture<restaurantThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ restaurantThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(restaurantThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
