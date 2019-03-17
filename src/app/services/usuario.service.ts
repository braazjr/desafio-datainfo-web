import { UsuarioExterno } from './../models/usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  getUsuarios() {
    return this.http.get('http://localhost:8080/usuario-externo');
  }

  postUsuario(usuarioExterno: UsuarioExterno) {
    return this.http.post('http://localhost:8080/usuario-externo', usuarioExterno);
  }

  deleteUsuario(nuCpf: string) {
    return this.http.delete('http://localhost:8080/usuario-externo/' + nuCpf);
  }
}
