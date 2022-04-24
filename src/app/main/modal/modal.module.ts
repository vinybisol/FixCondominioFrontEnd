import { CoreCommonModule } from '@core/common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalFinanceiroLancamentosComponent } from './modal-financeiro-lancamentos/modal-financeiro-lancamentos.component';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';


const routes = [
  {
    path: 'form-modal',
    component: ModalFinanceiroLancamentosComponent
  }

];


@NgModule({
  declarations: [
    ModalFinanceiroLancamentosComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),  
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    ReactiveFormsModule 
  ],
  exports:[]
})
export class ModalModule { }
