import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioExterno } from './../../models/usuario';
import { FuncaoUsuarioService } from './../../services/funcao-usuario.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})
export class FormularioUsuarioComponent implements OnInit {

  funcoes: any[] = [];
  usuario: UsuarioExterno = new UsuarioExterno();
  alertaMensagem: string;

  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  telefoneMask = ['(', /[1-9]/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private funcaoUsuarioService: FuncaoUsuarioService,
    private cdr: ChangeDetectorRef,
    private usuarioService: UsuarioService
  ) {
  }

  ngOnInit() {
    this.getFuncoesUsuario();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  getFuncoesUsuario() {
    this.funcaoUsuarioService.getFuncoesUsuario().subscribe(data => {
      console.log(data);
      this.funcoes = data as any[];
    }, error => {
      console.log(error);
    })
  }

  incluirUsuario(usuarioForm) {
    console.log(usuarioForm);

    if (usuarioForm.valid) {
      this.usuario.nuCpf = this.getSomenteNumeros(this.usuario.nuCpf);
      this.usuario.nuTelefone = this.getSomenteNumeros(this.usuario.nuTelefone);

      this.usuarioService.postUsuario(this.usuario).subscribe(data => {
        console.log(data);
        this.exibeMensagem('Cadastro efetuado com sucesso!');
        usuarioForm.reset();
        this.usuario = new UsuarioExterno();
      })
    }
  }

  getSomenteNumeros(valor: string): string {
    if (valor.match(/\d/g)) {
      return valor.match(/\d/g).join('');
    } else {
      return '';
    }
  }

  exibeMensagem(mensagem) {
    this.alertaMensagem = mensagem;
    setTimeout(() => {
      this.alertaMensagem = undefined;
    }, 3000);
  }
}
