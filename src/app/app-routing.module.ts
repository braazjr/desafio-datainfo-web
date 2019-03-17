import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { FormularioUsuarioComponent } from './pages/formulario-usuario/formulario-usuario.component';

const routes: Routes = [
  { path: 'lista-usuarios', component: ListaUsuariosComponent },
  { path: 'formulario-usuario', component: FormularioUsuarioComponent },
  { path: 'formulario-usuario/:nuCpf', component: FormularioUsuarioComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
