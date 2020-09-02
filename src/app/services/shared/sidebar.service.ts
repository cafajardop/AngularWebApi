import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];
  /* menu: any = [
    {
       titulo: 'Principal',
       icono: 'mdi mdi-gauge',
       submenu: [
         {  titulo: 'Usuarios', url:'/usuarios'},
       ]
    },
    {
      titulo: 'Administrador',
      icono: 'mdi mdi-folder-lock-open',
      submenu:[
        { titulo: 'Usuarios',url: '/usuarios' },
      ]
    },
    {
     titulo: 'Sub-Administrador',
     icono: 'mdi mdi-folder-lock-open',
     submenu:[
       { titulo: 'Usuarios',url: '/usuarios' },
       { titulo: 'Usuarios',url: '/usuarios' },
       { titulo: 'Usuarios',url: '/usuarios' },
     ]
   }
 ]; */

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  cargarMenu() {
    this.menu = this._usuarioService.menu;    
  }
}