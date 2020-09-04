import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {


  usuarios: UsuarioModel[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  iduser:string;  
  usuarioRole: UsuarioModel;
  role:string;


  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.usuarioRole = JSON.parse(localStorage.getItem('usuario'));
    this.role = this.usuarioRole.role;
    this.cargarUsuarios();
    this._modalUploadService.notificacion
      .subscribe(resp => this.cargarUsuarios());
  }

  mostrarModal(id: string) {    
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;        
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }
  buscarUsuario(termino: string) {
    // console.log (termino);
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;

    /* this._usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        // console.log(usuarios);
        this.usuarios = usuarios;
        this.cargando = false;
      }); */
  }
  borrarUsuario(usuario: UsuarioModel, id:string) {
    if (usuario._id === this._usuarioService.usuario._id) {
      Swal.fire('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }


    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta a punto de borrar al usuario: ${usuario.email}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario(usuario._id)
          .subscribe(borrado => {
            this.cargarUsuarios();
          });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  crearUsuario() {
    /* Swal.fire({
      title: 'Crear hospital',
      input: 'text',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }
      this._hospitalService.crearHospital(valor)
        .subscribe(() => this.cargarHospitales());
    }) */
  }

  guardarUsuario(usuario: UsuarioModel) {    
    this._usuarioService.actualizarUsuario(usuario,this.iduser)
      .subscribe();
  }
}