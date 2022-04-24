import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceiroComponent } from './financeiro/financeiro.component';
import { RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CoreCommonModule } from '@core/common.module';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from 'app/auth/helpers';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'financeiro',
    component: FinanceiroComponent,
    data: { animation: 'sample',  roles: [1] },
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'home', roles: [1, 2] },
    canActivate: [AuthGuard]
  },
  {
    path: 'financeiro',
    loadChildren: () => import('../modal/modal.module').then(m => m.ModalModule),
    canActivate: [AuthGuard]
  },

];

@NgModule({
  declarations: [
    FinanceiroComponent,
    HomeComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    ContentHeaderModule, 
    TranslateModule, 
    CoreCommonModule,
    NgxDatatableModule,
    NgbModule],
  exports:[HomeComponent, FinanceiroComponent]
})
export class NavModule { }
