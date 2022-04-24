import { RegisterUser } from 'app/auth/models/registerUser';
import { map, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LancamentoModelo } from '../modelos/lacamento.modelo';
import { Observable } from 'rxjs';
import { pipeFromArray } from 'rxjs/internal/util/pipe';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
private url: string = environment.apiUrl;

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


  constructor(
    private _http: HttpClient
  ) { }

getAllLancamentos(): Observable<LancamentoModelo[]>{
  return this._http.get<LancamentoModelo[]>(`${this.url}/api/Lancamentos/buscartodos`)
}

addLancamento(descricao: string, valor: number, tipo:number): Observable<LancamentoModelo>{
  return this._http.post<LancamentoModelo>(`${this.url}/api/Lancamentos/criar`, {descricao, valor, tipo}, this.httpOptions);
}
}
