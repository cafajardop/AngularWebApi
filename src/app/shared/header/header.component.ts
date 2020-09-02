import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  
  usuario: UsuarioModel;

  constructor( 
    public _usuarioService: UsuarioService,
    public router : Router
    )
     { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;    
  }

  buscar(termino: string){
    this.router.navigate(['/busqueda', termino ])
  }


}
