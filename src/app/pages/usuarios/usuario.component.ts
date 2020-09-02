import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel('', '', '', '', '');
  idUser: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public _usuarioService: UsuarioService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'nuevo') {
        this.cargarUsuario(id);
      }
    });
  }

  ngOnInit(): void {

  }

  cargarUsuario(id: string) {
    this.idUser = id;
    this._usuarioService.cargarUsuario(id)
      .subscribe(usuario => {
        this.usuario = usuario;
      });
  }

  cambioHospital(id: string) {

    /*  this._hospitalService.obtenerHospital(id)
       .subscribe(hospital => this.hospital = hospital); */

  }

  guardarUsuario(f: NgForm) {
    if (f.invalid) {
      return;
    }

    this._usuarioService.actualizarUsuario(this.usuario, this.idUser)
      .subscribe(() => {        
        this.router.navigate(['/usuarios']);
      });
  }
}
