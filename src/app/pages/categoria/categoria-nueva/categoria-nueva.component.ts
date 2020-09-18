import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaModel } from 'src/app/models/categoriaModel';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-categoria-nueva',
  templateUrl: './categoria-nueva.component.html',
  styleUrls: ['./categoria-nueva.component.css']
})
export class CategoriaNuevaComponent implements OnInit {

  constructor(public _categoriaService: CategoriaService,
    public router: Router) { }

  ngOnInit(): void {
  }


  guardarCategoriaNuevo(f: NgForm){
    if (f.invalid) {
      return;
    }
    let categoria = new CategoriaModel(f.value.nombre,f.value.codigo)
    this._categoriaService.crearCategorias(categoria)
      .subscribe(resp => this.router.navigate(['/categorias']));
  }
}
