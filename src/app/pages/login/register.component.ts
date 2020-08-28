import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;
  usuario: UsuarioModel;

  constructor(public _usuarioService: UsuarioService,
    public router: Router) { }

  ngOnInit() {
    this.forma = new FormGroup({
      nombres: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    }
      /* , { validators: this.sonIguales('password','password2') }) */
    );
  }

  registrarUsuario() {
    console.log(this.forma);

    if (this.forma.invalid) { return; }
    console.log(this.forma.value);

    /* if (!this.forma.value.condiciones){
      Swal.fire('Importante','Debe de aceptar las condiciones','warning');
      return;
    } */

    let usuario = new UsuarioModel(
      this.forma.value.nombres,
      this.forma.value.apellidos,
      this.forma.value.telefono,
      this.forma.value.email,
      this.forma.value.password,
    );

    this._usuarioService.crearUsuario(usuario)
      .subscribe(resp => this.router.navigate(['/login']));
  }

}
