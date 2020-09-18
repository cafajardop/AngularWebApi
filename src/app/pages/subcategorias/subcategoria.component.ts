import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaModel } from 'src/app/models/categoriaModel';
import { SubCategoriaModel } from 'src/app/models/subcategoriaModel';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { SubcategoriaService } from 'src/app/services/subcategoria/subcategoria.service';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {

  categorias: CategoriaModel = new CategoriaModel('','')
  subcategoria: SubCategoriaModel = new SubCategoriaModel('','','');
  idCategoria: string;
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public _subcategoriaService: SubcategoriaService,
    public _categoriaServices: CategoriaService
  ) { 
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'nuevo') {        
        this.cargarSubCategoria(id);
      }
    });
  }

  ngOnInit(): void {
    this.cargarCategoria();
  }

  cargarCategoria() {
    this._categoriaServices.cargarCategoriasCurso()
      .subscribe((resp:any) => {
        this.categorias = resp.categoria
      });
  }

  cargarSubCategoria(id: string) {
    this.idCategoria = id;    
    this._subcategoriaService.cargarSubCategoria(id)
      .subscribe(curso => {
        this.subcategoria = curso;
      });
  }

  guardarSubCategoria(f: NgForm) {
    if (f.invalid) {
      return;
    }

    this._subcategoriaService.actualizarSubCategoria(this.subcategoria, this.idCategoria)
      .subscribe(() => {        
        this.router.navigate(['/subcategorias']);
      });
  }
}
