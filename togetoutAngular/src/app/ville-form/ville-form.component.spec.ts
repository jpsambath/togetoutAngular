import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VilleFormComponent } from './ville-form.component';

describe('VilleFormComponent', () => {
  let component: VilleFormComponent;
  let fixture: ComponentFixture<VilleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VilleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VilleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
