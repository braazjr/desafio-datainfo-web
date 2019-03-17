import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuncaoUsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  getFuncoesUsuario() {
    return this.http.get('http://localhost:8080/funcao-usuario-externo');
  }
}
