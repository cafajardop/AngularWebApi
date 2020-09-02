import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-nuevos',
  templateUrl: './usuarios-nuevos.component.html',
  styles: []
})
export class UsuariosNuevosComponent implements OnInit {

  constructor(public _usuarioService: UsuarioService,
    public router: Router) { }

  ngOnInit(): void {
  }

  guardarUsuarioNuevo(f: NgForm){
    if (f.invalid) {
      return;
    }
    let usuario = new UsuarioModel(f.value.nombres,f.value.apellidos,f.value.telefono, f.value.email, f.value.password)
    this._usuarioService.crearUsuario(usuario)
      .subscribe(resp => this.router.navigate(['/usuarios']));
  }
}
