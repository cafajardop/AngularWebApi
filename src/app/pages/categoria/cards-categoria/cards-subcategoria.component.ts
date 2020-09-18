import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategoriaModel } from 'src/app/models/subcategoriaModel';
import { SubcategoriaService } from 'src/app/services/subcategoria/subcategoria.service';

@Component({
  selector: 'app-cards-subcategoria',
  templateUrl: './cards-subcategoria.component.html',
  styleUrls: ['./cards-subcategoria.component.css']
})
export class CardsSubcategoriaComponent implements OnInit {

  subcategorias: SubCategoriaModel[] = [];
  cargando: boolean = true;
  desde: number = 0;
  totalRegistros: number = 0;
  idcategoria:string;
  constructor(
    public _subcategoriaService: SubcategoriaService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { 
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.cargarSubCategoria(id);
    });
  }

  ngOnInit(): void {
  }

  cargarSubCategoria(id: string) {    
    this.idcategoria = id;
    this._subcategoriaService.cargarViewSubCategorias(id)
      .subscribe(subCategoria => {
        this.subcategorias = subCategoria;        
        this.cargando = false;
        console.log(subCategoria);        
      });
  }

  cargarSubCategorias() {
    this.cargando = true;
    this._subcategoriaService.cargarSubCategorias(this.desde)
      .subscribe((resp: any) => {        
        this.totalRegistros = resp.total;        
        this.subcategorias = resp.categorias;        
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
    this.cargarSubCategorias();
  }

  buscarSubcategoria(termino: string) {
    // console.log (termino);
    if (termino.length <= 0) {
      this.cargarSubCategoria(this.idcategoria);
      return;
    }
    this.cargando = true;

    this._subcategoriaService.buscarSubCategoria(termino)
      .subscribe((subcategoria: SubCategoriaModel[]) => {
        // console.log(usuarios);
        this.subcategorias = subcategoria;
        this.cargando = false;
      });
  }
}
