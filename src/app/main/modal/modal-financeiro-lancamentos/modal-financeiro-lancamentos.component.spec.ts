import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFinanceiroLancamentosComponent } from './modal-financeiro-lancamentos.component';

describe('ModalFinanceiroLancamentosComponent', () => {
  let component: ModalFinanceiroLancamentosComponent;
  let fixture: ComponentFixture<ModalFinanceiroLancamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFinanceiroLancamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFinanceiroLancamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
