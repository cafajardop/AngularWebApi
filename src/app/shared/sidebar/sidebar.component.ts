import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/shared/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { UsuarioModel } from 'src/app/models/usuarioModel';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: UsuarioModel;  
  constructor(
    public _sidebar: SidebarService,
     public _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
    this._sidebar.cargarMenu();    
  }
}
