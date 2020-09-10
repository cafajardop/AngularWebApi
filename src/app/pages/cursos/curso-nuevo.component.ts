import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoService } from 'src/app/services/service.index';
import { CursoModel } from 'src/app/models/cursoModel';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-curso-nuevo',
  templateUrl: './curso-nuevo.component.html',
  styleUrls: ['./curso-nuevo.component.css']
})
export class CursoNuevoComponent implements OnInit {

  constructor(public _cursoService: CursoService,
    public router: Router) { }

  ngOnInit(): void {
  }

  guardarCursoNuevo(f: NgForm){
    if (f.invalid) {
      return;
    }
    let curso = new CursoModel(f.value.nombre,)
    this._cursoService.crearCurso(curso)
      .subscribe(resp => this.router.navigate(['/cursos']));
  }
}
