import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowConfigComponent } from './show-config.component';

describe('ShowConfigComponent', () => {
  let component: ShowConfigComponent;
  let fixture: ComponentFixture<ShowConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowConfigComponent]
    });
    fixture = TestBed.createComponent(ShowConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
