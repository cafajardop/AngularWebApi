import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuario: UsuarioModel;
  /* roles = ['ADMIN_ROLE', 'USER_ROLE']; */
  countryForm: FormGroup;
  Seleccione: string = 'Seleccione'
  defaultOption = null;
  roles = [
    { id: 1, name: 'ADMIN_ROLE' },
    { id: 2, name: 'USER_ROLE' },
  ];

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  guardarUsuario(forma: NgForm) {

    if (forma.invalid) { return; }
    let usuario = new UsuarioModel(
      forma.value.nombres,
      forma.value.apellidos,
      forma.value.telefono,
      forma.value.email,
      forma.value.password,
      forma.value.img,
      forma.value.role
    );

    this._usuarioService.actualizarUsuario(usuario)
      .subscribe(res => {
        console.log(res)
        forma.reset()
      });
  }

}
