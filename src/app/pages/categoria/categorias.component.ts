import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { CategoriaModel } from 'src/app/models/categoriaModel';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: CategoriaModel[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  iduser: string;

  constructor(
    public _categoriaService: CategoriaService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarCategorias();
    this._modalUploadService.notificacion
      .subscribe(resp => this.cargarCategorias()); 
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('categorias', id);
  }
  
  borrarCategoria(categoria: CategoriaModel, id: string) {
    
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta a punto de borrar categoria: ${categoria.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.value) {
        this._categoriaService.borrarCategoria(categoria._id)
          .subscribe(borrado => {
            this.cargarCategorias();
          });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
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

  buscarCategorias(termino: string) {
    // console.log (termino);
    if (termino.length <= 0) {
      this.cargarCategorias();
      return;
    }
    this.cargando = true;

    this._categoriaService.buscarCategoria(termino)
      .subscribe((categorias: CategoriaModel[]) => {
        // console.log(usuarios);
        this.categorias = categorias;
        this.cargando = false;
      });
  }
}