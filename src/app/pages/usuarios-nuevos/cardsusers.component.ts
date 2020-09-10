import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-cardsusers',
  templateUrl: './cardsusers.component.html',
  styleUrls: ['./cardsusers.component.css']
})
export class CardsusersComponent implements OnInit {

  usuarios: UsuarioModel[] = [];
  cargando: boolean = true;
  desde: number = 0;
  totalRegistros: number = 0;
  constructor(
    public _usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
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
}
