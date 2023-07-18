import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVeiculoComponent } from './create-veiculo.component';

describe('CreateVeiculoComponent', () => {
  let component: CreateVeiculoComponent;
  let fixture: ComponentFixture<CreateVeiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateVeiculoComponent]
    });
    fixture = TestBed.createComponent(CreateVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
