import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModeloComponent } from './delete-modelo.component';

describe('DeleteModeloComponent', () => {
  let component: DeleteModeloComponent;
  let fixture: ComponentFixture<DeleteModeloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteModeloComponent]
    });
    fixture = TestBed.createComponent(DeleteModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
