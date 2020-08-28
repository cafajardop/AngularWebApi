import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  auth2: any;
  usuario: UsuarioModel;

  constructor(private router: Router,private _usuarioService: UsuarioService) { }

  ngOnInit() {
    /* this.usuario = new UsuarioModel(); */
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    let usuario = new UsuarioModel('','','', forma.value.email, forma.value.password)
    this._usuarioService.login(usuario)
      .subscribe(correcto => this.router.navigate(['/dashboard']));

    // this.router.navigate([ '/dashboard' ]);
  }
}
