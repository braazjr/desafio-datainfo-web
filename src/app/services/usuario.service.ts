import { UsuarioFilter } from './../models/usuarioFilter';
import { UsuarioExterno } from './../models/usuario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  getUsuarios(filter: UsuarioFilter) {
    let params = new HttpParams();
    if (filter.nome)
      params = params.append('nome', filter.nome);
    if (filter.perfil)
      params = params.append('perfil', filter.perfil);
    if (filter.situacao)
      params = params.append('situacao', filter.situacao);

    console.log(params.toString())

    console.log(params.toString())

    return this.http.get(`http://localhost:8080/usuario-externo${params ? `?${params.toString()}` : ''}`);
  }

  postUsuario(usuarioExterno: UsuarioExterno) {
    return this.http.post('http://localhost:8080/usuario-externo', usuarioExterno);
  }

  deleteUsuario(nuCpf: string) {
    return this.http.delete(`http://localhost:8080/usuario-externo/${nuCpf}`);
  }

  putHabilitaDesabilitaUsuario(nuCpf: string) {
    return this.http.put(`http://localhost:8080/usuario-externo/${nuCpf}/habilita-desabilita`, null);
  }

  getUsuarioExterno(nuCpf: string) {
    return this.http.get(`http://localhost:8080/usuario-externo/${nuCpf}`);
  }

  putUsuarioExterno(nuCpf: string, usuarioExterno: UsuarioExterno) {
    return this.http.put(`http://localhost:8080/usuario-externo/${nuCpf}`, usuarioExterno);
  }
}
