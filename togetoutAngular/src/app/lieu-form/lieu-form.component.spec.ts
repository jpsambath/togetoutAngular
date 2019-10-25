import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LieuFormComponent } from './lieu-form.component';

describe('LieuFormComponent', () => {
  let component: LieuFormComponent;
  let fixture: ComponentFixture<LieuFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LieuFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LieuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
