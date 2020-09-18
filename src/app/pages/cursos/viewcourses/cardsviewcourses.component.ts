import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoModel } from 'src/app/models/cursoModel';
import { CursoService } from 'src/app/services/service.index';

@Component({
  selector: 'app-cardsviewcourses',
  templateUrl: './cardsviewcourses.component.html',
  styleUrls: ['./cardsviewcourses.component.css']
})
export class CardsviewcoursesComponent implements OnInit {

  cursos: CursoModel[] = [];
  curso: CursoModel = new CursoModel('');
  cargando: boolean = true;
  desde: number = 0;
  totalRegistros: number = 0;
  idUser: string;
  constructor(
    public _cursoService: CursoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { 
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.cargarCurso(id);
    });
  }

  ngOnInit(): void {
    /* this.cargarCursos(); */
  }

  /* cargarCursos() {
    this.cargando = true;
    this._cursoService.cargarCursos(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.cursos = resp.cursos;        
        this.cargando = false;        
      });
  } */

/*   cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarCurso();
  } */

  
  /* cargarCurso(id: string) {    
    this._cursoService.cargarCurso(id)
      .subscribe(curso => {
        this.curso = curso;
      });
  } */

  cargarCurso(id: string) {
    this.idUser = id;
    this._cursoService.cargarCursoCategoria(id)
      .subscribe(curso => {
        this.cursos = curso;        
        this.totalRegistros= curso.total;        
        this.cargando = false;        
      });
  }

  buscarClave(termino: string) {
    // console.log (termino);
    if (termino.length <= 0) {      
      this.cargarCurso(this.idUser);
      return;
    }
    this.cargando = true;

    this._cursoService.buscarCursos(termino)
      .subscribe((curso: CursoModel[]) => {
        // console.log(usuarios);
        this.cursos = curso;
        this.cargando = false;
      });
  }

}
