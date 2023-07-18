import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModeloComponent } from './update-modelo.component';

describe('UpdateModeloComponent', () => {
  let component: UpdateModeloComponent;
  let fixture: ComponentFixture<UpdateModeloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateModeloComponent]
    });
    fixture = TestBed.createComponent(UpdateModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
