import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { RegisterUser } from 'app/auth/models/registerUser';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RegisterService } from './../../../../auth/service/register.service';


@Component({
  selector: 'app-auth-register-v2',
  templateUrl: './auth-register-v2.component.html',
  styleUrls: ['./auth-register-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthRegisterV2Component implements OnInit {
  // Public
  public coreConfig: any;
  public passwordTextType: boolean;
  public registerForm: FormGroup;
  public submitted = false;

  // Private
  private _unsubscribeAll: Subject<any>;
  private dadosRegistro: RegisterUser = new RegisterUser;
  private returnUrl: string = '/pages/authentication/login-v2'

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _coreConfigService: CoreConfigService,
     private _formBuilder: FormBuilder,
     private _registerService: RegisterService,
     private _router: Router,
     private _toastrService: ToastrService) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this._registerService.registrar(this.f.username.value, this.f.password.value,this.f.email.value)
    .pipe(
      map(dados => {
        console.log(dados)
      })
    )
    .subscribe(
      data => {
        this._router.navigate([this.returnUrl])
      },
      error => 
        this.handlerError(error)
    )
  }
  public handlerError(error: any){
    this._toastrService.error('Erro ao realizar o cadastro', error.error.message)      
  };

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('((?=.*[A-Z]).{8,30})')]]
    });

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
