import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMarcasComponent } from './show-marcas.component';

describe('ShowMarcasComponent', () => {
  let component: ShowMarcasComponent;
  let fixture: ComponentFixture<ShowMarcasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowMarcasComponent]
    });
    fixture = TestBed.createComponent(ShowMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
