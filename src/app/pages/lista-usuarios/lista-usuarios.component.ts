import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: any[] = [];

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => {
      console.log(data);
      this.usuarios = data as any[];
    }, error => {
      console.log(error);
    })
  }

  getPerfil(idPerfilAcesso) {
    switch (idPerfilAcesso) {
      case 0:
        return 'Aluno'
      case 1:
        return 'Gestor Municipal'
      case 2:
        return 'Gestor Estadual'
      case 3:
        return 'Gestor Nacional'
    }
  }
}
