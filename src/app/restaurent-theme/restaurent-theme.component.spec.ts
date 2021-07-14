import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurentThemeComponent } from './restaurent-theme.component';

describe('RestaurentThemeComponent', () => {
  let component: RestaurentThemeComponent;
  let fixture: ComponentFixture<RestaurentThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurentThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurentThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
