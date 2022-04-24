import { LancamentoService } from 'app/shared/servicos/lancamento.service';
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { LancamentoModelo } from 'app/shared/modelos/lacamento.modelo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-modal-financeiro-lancamentos",
  templateUrl: "./modal-financeiro-lancamentos.component.html",
  styleUrls: ["./modal-financeiro-lancamentos.component.scss"],
})
export class ModalFinanceiroLancamentosComponent implements OnInit {
  // public
  public submitted = false;
  public lancamento: LancamentoModelo = new LancamentoModelo();

 
//form
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private _lancamentoService: LancamentoService,
    private _toasterService: ToastrService
     ) {}

 
  /**
   * On init
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      nome:  [this.lancamento.Descricao, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      valor: [this.lancamento.Valor, [Validators.required]],
      operacao: [this.lancamento.Modalidade, [Validators.required]]
    });
  }
  hasError(field: string){
    return this.form.get(field).errors
  }

  onSubimit(){
    this.submitted = true;
    if(this.form.valid){
      var tipoNumero: number = +this.form.get('operacao').value;
      this._lancamentoService.addLancamento(this.form.get('nome').value,this.form.get('valor').value, tipoNumero)
      .subscribe(data =>{
        if(data){
          this.onCancel();
        this._toasterService.success('Cadastro realizado com sucesso', 'Sucesso')
        }
        else{
          this._toasterService.error('Erro ao cadastrar lançamento', 'Erro');
        }        
      },
      erro => {
        this.onCancel();
        this._toasterService.error('Erro interno, verifique os valores', 'Erro');
      });
    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
    this.activeModal.dismiss();
  }
}
