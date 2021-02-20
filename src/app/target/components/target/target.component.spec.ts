import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetComponent} from './target.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MenubarModule} from "primeng/menubar";

describe('TargetComponent', () => {
  let component: TargetComponent;
  let fixture: ComponentFixture<TargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TargetComponent],
      imports: [RouterTestingModule, MenubarModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
