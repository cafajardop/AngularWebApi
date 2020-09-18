import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

declare function init_plugins()
declare const gapi: any;
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
    init_plugins();
    this.googleInit();
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    let usuario = new UsuarioModel('','','', forma.value.email, forma.value.password)
    this._usuarioService.login(usuario)
      .subscribe(() => this.router.navigate(['/account-settings']));

    // this.router.navigate([ '/dashboard' ]);
  }

  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:'341949644300-3r0og20a8703omkemgf3u38hibqaieu2.apps.googleusercontent.com',
        cookiepoliciy:'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element ){
    this.auth2.attachClickHandler(element,{}, (googleUser) =>{
        //let profile = googleUser.getBasicProfile();
        let token = googleUser.getAuthResponse().id_token;
        
        this._usuarioService.loginGoogle(token)
          .subscribe(()=> window.location.href='#/account-settings');
    });
  }
}
