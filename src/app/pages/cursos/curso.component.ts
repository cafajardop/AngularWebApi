import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/service.index';
import { CursoModel } from 'src/app/models/cursoModel';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  curso: CursoModel = new CursoModel('');
  idUser: string;
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public _cursoService: CursoService
  ) { 
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'nuevo') {
        console.log(id);
        
        this.cargarCurso(id);
      }
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

  guardarUsuario(f: NgForm) {
    if (f.invalid) {
      return;
    }

    this._cursoService.actualizarCurso(this.curso, this.idUser)
      .subscribe(() => {        
        this.router.navigate(['/cursos']);
      });
  }
}
