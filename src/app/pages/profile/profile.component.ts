import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario: UsuarioModel;
  imagenSubir: File;
  imagenTemp: any;
  iduser:string;
  
  constructor(public _usuarioService: UsuarioService) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }
  guardar(usuario:UsuarioModel){
    this.usuario.nombres = usuario.nombres;
    if(!this.usuario.google){
      this.usuario.email = usuario.email;
    }
    this._usuarioService.actualizarUsuario(this.usuario,'')
            .subscribe();
  }

  seleccionImage( archivo:File ){
  if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    
    if(archivo.type.indexOf('image')< 0 ){
      Swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  cambiarImagen() { 
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
