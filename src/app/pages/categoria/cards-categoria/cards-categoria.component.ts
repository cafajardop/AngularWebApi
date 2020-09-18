import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from 'src/app/models/categoriaModel';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-cards-categoria',
  templateUrl: './cards-categoria.component.html',
  styleUrls: ['./cards-categoria.component.css']
})
export class CardsCategoriaComponent implements OnInit {

  categorias: CategoriaModel[] = [];
  cargando: boolean = true;
  desde: number = 0;
  totalRegistros: number = 0;
  constructor(
    public _categoriaService: CategoriaService,
  ) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.cargando = true;
    this._categoriaService.cargarCategorias(this.desde)
      .subscribe((resp: any) => {        
        this.totalRegistros = resp.total;        
        this.categorias = resp.categorias;        
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarCategorias();
  }

  buscarTecnologia(termino: string) {
    // console.log (termino);
    if (termino.length <= 0) {
      this.cargarCategorias();
      return;
    }
    this.cargando = true;

    this._categoriaService.buscarCategoria(termino)
      .subscribe((categoria: CategoriaModel[]) => {
        // console.log(usuarios);
        this.categorias = categoria;
        this.cargando = false;
      });
  }
}
