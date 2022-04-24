import { SafeUrl } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { ToastrService } from "ngx-toastr";
import { map } from "rxjs/operators";
import { RegisterUser } from "../models/registerUser";

@Injectable({
  providedIn: "root",
})
export class RegisterService {

  constructor(
    private _http: HttpClient,
    private _toastrService: ToastrService
  ) {}


  /**
   * User login
   *
   * @param RegisterUser
   * @returns user
   */
  
  registrar(nome: string, senha: string, email: string) {
    return this._http
      .post<any>(`${environment.apiUrl}/api/CadastroUsuario/criar`, {
        nome,
        senha,
        email
      })
      .pipe(
        map((retorno) => {
          if (retorno) {
            setTimeout(() => {
              this._toastrService.success(
                "Cadastro realizado",
                "Seu cadastro foi realizado",
                { toastClass: "toast ngx-toastr", closeButton: true }
              );
            }, 500);
          }
          return retorno;
        })
      );
  }
}
