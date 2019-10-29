import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherSortieComponent } from './afficher-sortie.component';

describe('AfficherSortieComponent', () => {
  let component: AfficherSortieComponent;
  let fixture: ComponentFixture<AfficherSortieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherSortieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
