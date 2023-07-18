import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowModelosComponent } from './show-modelos.component';

describe('ShowModelosComponent', () => {
  let component: ShowModelosComponent;
  let fixture: ComponentFixture<ShowModelosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowModelosComponent]
    });
    fixture = TestBed.createComponent(ShowModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
