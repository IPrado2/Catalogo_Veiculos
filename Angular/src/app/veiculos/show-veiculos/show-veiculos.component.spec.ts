import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVeiculosComponent } from './show-veiculos.component';

describe('ShowVeiculosComponent', () => {
  let component: ShowVeiculosComponent;
  let fixture: ComponentFixture<ShowVeiculosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowVeiculosComponent]
    });
    fixture = TestBed.createComponent(ShowVeiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
