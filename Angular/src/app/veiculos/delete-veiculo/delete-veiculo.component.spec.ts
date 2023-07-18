import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVeiculoComponent } from './delete-veiculo.component';

describe('DeleteVeiculoComponent', () => {
  let component: DeleteVeiculoComponent;
  let fixture: ComponentFixture<DeleteVeiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteVeiculoComponent]
    });
    fixture = TestBed.createComponent(DeleteVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
