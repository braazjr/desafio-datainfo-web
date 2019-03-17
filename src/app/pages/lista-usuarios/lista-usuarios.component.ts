import { UsuarioFilter } from './../../models/usuarioFilter';
import { FuncaoUsuarioService } from './../../services/funcao-usuario.service';
import { FuncaoUsuarioExterno } from './../../models/funcao';
import { UsuarioExterno } from './../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: UsuarioExterno[] = [];
  usuarioSelecionado: UsuarioExterno = new UsuarioExterno();
  funcoes: FuncaoUsuarioExterno[] = [];
  filter: UsuarioFilter = new UsuarioFilter();

  alertaMensagem: string;
  alertaTipo: string;

  constructor(
    private usuarioService: UsuarioService,
    private funcaoUsuarioService: FuncaoUsuarioService
  ) { }

  ngOnInit() {
    this.getUsuarios();
    this.getFuncoesUsuario();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios(this.filter).subscribe(data => {
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

  excluiUsuario(modal) {
    this.usuarioService.deleteUsuario(this.usuarioSelecionado.nuCpf).subscribe(data => {
      console.log();
      this.exibeMensagem('success', 'Exclusão efetuada com sucesso.');
    }, error => {
      console.log(error);
      this.exibeMensagem('success', 'Ocorreu um erro ao excluir usuário!');
    }, () => {
      this.usuarioSelecionado = new UsuarioExterno();
      this.getUsuarios()
    });
  }

  exibeMensagem(tipo, mensagem) {
    this.alertaTipo = tipo;
    this.alertaMensagem = mensagem;
    setTimeout(() => {
      this.alertaTipo = tipo;
      this.alertaMensagem = undefined;
    }, 3000);
  }

  habilitaDesabilitaUsuario(usuario) {
    this.usuarioSelecionado = usuario;

    this.usuarioService.putHabilitaDesabilitaUsuario(usuario.nuCpf).subscribe(data => {
      if ((data as UsuarioExterno).icSituacao === 'A') {
        this.exibeMensagem('success', 'Usuário desabilitado com sucesso!');
      } else {
        this.exibeMensagem('success', 'Usuário habilitado com sucesso!');
      }
    }, error => {
      console.log(error);
      this.exibeMensagem('danger', 'Ocorreu um erro ao atualizar usuário!')
    }, () => {
      this.usuarioSelecionado = new UsuarioExterno();
      this.getUsuarios();
    })
  }

  getFuncoesUsuario() {
    this.funcaoUsuarioService.getFuncoesUsuario().subscribe(data => {
      console.log(data);
      this.funcoes = data as any[];
    }, error => {
      console.log(error);
    })
  }
}
