import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalWrapperComponent } from './horizontal-wrapper.component';

describe('HorizontalWrapperComponent', () => {
  let component: HorizontalWrapperComponent;
  let fixture: ComponentFixture<HorizontalWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
