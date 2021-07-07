import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValetUsersDialogComponent } from './valet-users-dialog.component';

describe('ValetUsersDialogComponent', () => {
  let component: ValetUsersDialogComponent;
  let fixture: ComponentFixture<ValetUsersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValetUsersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValetUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
