import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoService } from 'src/app/services/service.index';
import { CursoModel } from 'src/app/models/cursoModel';
import { NgForm } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { CategoriaModel } from 'src/app/models/categoriaModel';
import { SubcategoriaService } from 'src/app/services/subcategoria/subcategoria.service';
import { SubCategoriaModel } from 'src/app/models/subcategoriaModel';

@Component({
  selector: 'app-curso-nuevo',
  templateUrl: './curso-nuevo.component.html',
  styleUrls: ['./curso-nuevo.component.css']
})
export class CursoNuevoComponent implements OnInit {

  subcategoria: SubCategoriaModel = new SubCategoriaModel('','','');
  curso: CursoModel = new CursoModel('');
  categorias: CategoriaModel = new CategoriaModel('','')
  constructor(public _cursoService: CursoService,
    public _categoriaServices: CategoriaService,
    public _subcategoriaServices: SubcategoriaService,
    public router: Router) { }

  ngOnInit() {
    this.subcargarCategoria();
    this.cargarCategoria();
  }

  guardarCursoNuevo(f: NgForm){
    if (f.invalid) {
      return;
    }
    let curso = new CursoModel(f.value.nombre,f.value.tipo);
    
    this._cursoService.crearCurso(curso)
      .subscribe(resp => this.router.navigate(['/cursos']));
  }

  subcargarCategoria() {
    this._subcategoriaServices.cargarSubCategoriasCurso()
      .subscribe((resp:any) => {
        this.subcategoria = resp.subcategoria
      });
  }


  cargarCategoria() {
    this._categoriaServices.cargarCategoriasCurso()
      .subscribe((resp:any) => {
        this.categorias = resp.categoria        
      });
  }

}
