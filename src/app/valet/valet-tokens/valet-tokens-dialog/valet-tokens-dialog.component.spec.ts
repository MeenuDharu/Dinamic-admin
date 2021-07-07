import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValetTokensDialogComponent } from './valet-tokens-dialog.component';

describe('ValetTokensDialogComponent', () => {
  let component: ValetTokensDialogComponent;
  let fixture: ComponentFixture<ValetTokensDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValetTokensDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValetTokensDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
