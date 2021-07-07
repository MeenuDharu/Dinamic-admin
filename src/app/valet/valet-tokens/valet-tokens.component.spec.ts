import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValetTokensComponent } from './valet-tokens.component';

describe('ValetTokensComponent', () => {
  let component: ValetTokensComponent;
  let fixture: ComponentFixture<ValetTokensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValetTokensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValetTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
