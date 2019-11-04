import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Produto } from '../models/models';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
  ) { }


  // Busca todos os produtos, autenticando via Token.
  // TODO: Este cara está aqui apenas para teste. Crie um provedor especifico para
  // produtos.
  getProdutos(): Observable<Produto[]> {
    const header = 'Authorization: Token ' + this.loginService.getCookieToken();
    const headers = new HttpHeaders(header);
    return this.http.get<Produto[]>(environment.baseUrl + 'produtos/', { headers });
  }

}
