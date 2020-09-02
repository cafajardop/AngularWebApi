import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http: HttpClient,
    public router: Router) {
    this.cargarStorage();
  }

  usuario: UsuarioModel;
  token: string;
  menu: any[] = [];

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      /* this.menu = JSON.parse(localStorage.getItem('menu')); */

    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: UsuarioModel, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  login(usuario: UsuarioModel) {
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          console.log(resp);
          this.guardarStorage(usuario._id, resp.token, resp.usuario, resp.menu);
          return true;
        }),
        catchError(err => {
          console.log(err.error.mensaje);
          Swal.fire('Error en el login', err.error.mensaje, 'error')
          return Observable.throw(err.status);
        })
      );

  }
  
  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  crearUsuario(usuario: UsuarioModel) {
    let headers = new Headers();
    let url = URL_SERVICIOS + '/usuario';

    // return this.http.post( url, usuario );
    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          Swal.fire('Usuario creado', usuario.email, 'success')
          return resp.usuario;
        }),
        catchError(err => {
          console.log(err);
          Swal.fire(err.error.mensaje, err.error.errors.message, 'error')
          return Observable.throw(err.status);
        })
      );
  }

  cargarUsuarios() {
    this.cargarStorage();

    let url = URL_SERVICIOS + '/usuario?token=' + this.token;
    return this.http.get(url);
  }

  cargarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.usuario)
      );
  }

  actualizarUsuario(usuario: UsuarioModel, id: string) {
    this.cargarStorage();

    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;


    return this.http.put(url, usuario)
      .pipe(
        map((resp: any) => {
          if (resp.ok === false) {
            Swal.fire('Usuario No Actualizado', resp.err.message, 'error');
          }
          else {
            if (usuario._id === this.usuario._id) {
              let usuarioDB: UsuarioModel = resp.usuario;
              this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
            }
            Swal.fire('Usuario actualizado', usuario.nombres, 'success');
            return true;
          }
        }),
        catchError(err => {
          console.log(err);
          Swal.fire(err, err, 'error')
          return Observable.throw(err.status);
        })
      );
  }


  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
      .pipe(
        map((resp: any) => {

          if (resp.ok === false) {
            Swal.fire('Usuario No borrado', resp.err.message, 'error');
          }
          else {
            Swal.fire('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
            return true;
          }
        }),
        catchError(err => {
          console.log(err);
          return Observable.throw(err.status);
        }));
  }
}
