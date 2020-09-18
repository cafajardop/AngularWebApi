import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaModel } from 'src/app/models/categoriaModel';
import { SubCategoriaModel } from 'src/app/models/subcategoriaModel';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { SubcategoriaService } from 'src/app/services/subcategoria/subcategoria.service';

@Component({
  selector: 'app-subcategoria-nueva',
  templateUrl: './subcategoria-nueva.component.html',
  styleUrls: ['./subcategoria-nueva.component.css']
})
export class SubcategoriaNuevaComponent implements OnInit {

  categorias: CategoriaModel = new CategoriaModel('','')
  subcategoria: SubCategoriaModel = new SubCategoriaModel('','','');
  
  constructor(public _subcategoriaService: SubcategoriaService,
    public _categoriaServices: CategoriaService,
    public router: Router) { }

  ngOnInit(): void {
    this.cargarCategoria();
  }

  cargarCategoria() {
    this._categoriaServices.cargarCategoriasCurso()
      .subscribe((resp:any) => {
        this.categorias = resp.categoria
      });
  }

  guardarCategoriaNuevo(f: NgForm){
    if (f.invalid) {
      return;
    }
    let subcategoria = new SubCategoriaModel(f.value.nombre,f.value.subcategoria)
    this._subcategoriaService.crearSubCategorias(subcategoria)
      .subscribe(resp => this.router.navigate(['/categorias']));
  }

}
