import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/service.index';
import { CursoModel } from 'src/app/models/cursoModel';
import { NgForm } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { CategoriaModel } from 'src/app/models/categoriaModel';
import { SubcategoriaService } from 'src/app/services/subcategoria/subcategoria.service';
import { SubCategoriaModel } from 'src/app/models/subcategoriaModel';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  subcategoria: SubCategoriaModel = new SubCategoriaModel('','','');
  curso: CursoModel = new CursoModel('');
  idUser: string;
  categorias: CategoriaModel = new CategoriaModel('','')
  selectedValue = null;  
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public _cursoService: CursoService,
    public _categoriaServices: CategoriaService,
    public _subcategoriaServices: SubcategoriaService

  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'nuevo') {
        this.cargarCurso(id);
      }
    });
  }

  ngOnInit() {
    this.subcargarCategoria();
    this.cargarCategoria();
  }

  cargarCategoria() {
    this._categoriaServices.cargarCategoriasCurso()
      .subscribe((resp:any) => {
        this.categorias = resp.categoria        
      });
  }

  subcargarCategoria() {
    this._subcategoriaServices.cargarSubCategoriasCurso()
      .subscribe((resp:any) => {
        this.subcategoria = resp.subcategoria
      });
  }

  cargarCurso(id: string) {
    this.idUser = id;
    this._cursoService.cargarCurso(id)
      .subscribe(curso => {
        this.curso = curso;
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
  
  buscarCategoria(termino: string) {

  }
}
