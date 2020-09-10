import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/service.index';
import { CursoModel } from 'src/app/models/cursoModel';

@Component({
  selector: 'app-viewcourses',
  templateUrl: './viewcourses.component.html',
  styleUrls: ['./viewcourses.component.css']
})
export class ViewcoursesComponent implements OnInit {
  curso: CursoModel = new CursoModel('');
  idUser: string;
  imagenTemp: any;
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public _cursoService: CursoService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.cargarCurso(id);
    });
  }

  ngOnInit(): void {
  }

  cargarCurso(id: string) {
    this.idUser = id;
    this._cursoService.cargarCurso(id)
      .subscribe(curso => {
        this.curso = curso;
        console.log(curso);
      });
  }

}
