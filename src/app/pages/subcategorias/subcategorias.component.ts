import { Component, OnInit } from '@angular/core';
import { SubCategoriaModel } from 'src/app/models/subcategoriaModel';
import { SubcategoriaService } from 'src/app/services/subcategoria/subcategoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.css']
})
export class SubcategoriasComponent implements OnInit {

  subcategorias: SubCategoriaModel[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  iduser: string;

  constructor(
    public _subcategoriaService: SubcategoriaService,    
  ) { }

  ngOnInit() {
    this.cargarSubCategorias();
  }
  
  borrarCategoria(subcategoria: SubCategoriaModel, id: string) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta a punto de borrar categoria: ${subcategoria.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.value) {
        this._subcategoriaService.borrarSubCategoria(subcategoria._id)
          .subscribe(borrado => {
            this.cargarSubCategorias();
          });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  cargarSubCategorias() {
    this.cargando = true;
    this._subcategoriaService.cargarSubCategorias(this.desde)
      .subscribe((resp: any) => {       
        this.totalRegistros = resp.total;
        this.subcategorias = resp.subcategorias;
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

  buscarSubCategorias(termino: string) {
    // console.log (termino);
    if (termino.length <= 0) {
      this.cargarSubCategorias();
      return;
    }
    this.cargando = true;

    this._subcategoriaService.buscarSubCategoria(termino)
      .subscribe((subcategorias: SubCategoriaModel[]) => {
        // console.log(usuarios);
        this.subcategorias = subcategorias;
        this.cargando = false;
      });
  }
}