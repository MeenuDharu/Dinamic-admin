import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValetUsersComponent } from './valet-users.component';

describe('ValetUsersComponent', () => {
  let component: ValetUsersComponent;
  let fixture: ComponentFixture<ValetUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValetUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValetUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
