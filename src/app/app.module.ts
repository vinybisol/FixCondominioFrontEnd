import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';

import { coreConfig } from 'app/app-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { NavModule } from 'app/main/nav/nav.module';
import { AuthGuard } from './auth/helpers/auth.guards';
import { ModalModule } from './main/modal/modal.module';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/nav/nav.module').then(m => m.NavModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,

    // App modules
    LayoutModule,
    NavModule,
    ModalModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
