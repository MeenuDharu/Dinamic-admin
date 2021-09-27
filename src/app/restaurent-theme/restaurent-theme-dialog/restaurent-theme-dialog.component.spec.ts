import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurentThemeDialogComponent } from './restaurent-theme-dialog.component';

describe('RestaurentThemeDialogComponent', () => {
  let component: RestaurentThemeDialogComponent;
  let fixture: ComponentFixture<RestaurentThemeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurentThemeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurentThemeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
