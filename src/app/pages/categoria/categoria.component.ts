import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaModel } from 'src/app/models/categoriaModel';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria: CategoriaModel = new CategoriaModel('','','');
  idCategoria: string;
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public _categoriaService: CategoriaService
  ) { 
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'nuevo') {        
        this.cargarCategoria(id);
      }
    });
  }

  ngOnInit(): void {
  }

  cargarCategoria(id: string) {
    this.idCategoria = id;    
    this._categoriaService.cargarCategoria(id)
      .subscribe(curso => {
        this.categoria = curso;        
      });
  }

  guardarUsuario(f: NgForm) {
    if (f.invalid) {
      return;
    }

    this._categoriaService.actualizarCategoria(this.categoria, this.idCategoria)
      .subscribe(() => {        
        this.router.navigate(['/categorias']);
      });
  }
}
