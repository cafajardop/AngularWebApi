import { Component, OnInit } from '@angular/core';
import { CursoModel } from 'src/app/models/cursoModel';
import { CursoService } from 'src/app/services/service.index';

@Component({
  selector: 'app-cardscourses',
  templateUrl: './cardscourses.component.html',
  styleUrls: ['./cardscourses.component.css']
})
export class CardscoursesComponent implements OnInit {

  cursos: CursoModel[] = [];
  cargando: boolean = true;
  desde: number = 0;
  totalRegistros: number = 0;
  constructor(
    public _cursoService: CursoService,
  ) { }

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos() {
    this.cargando = true;
    this._cursoService.cargarCursos(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.cursos = resp.cursos;        
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
    this.cargarCursos();
  }
}
