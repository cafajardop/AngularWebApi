import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../../assets/config/config';
import { CategoriaModel } from 'src/app/models/categoriaModel';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoria: CategoriaModel;
  
  constructor(public http: HttpClient) { }

  cargarCategorias(desde: number = 0) {
    let url = URL_SERVICIOS + '/categoria?desde=' + desde;
    return this.http.get(url);
  }

  
  cargarCategoriasCurso() {
    let url = URL_SERVICIOS + '/categorias';
    return this.http.get(url);
  }

  cargarCategoria(id: string) {
    let url = URL_SERVICIOS + '/categoria/' + id;
    
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.categoria)
      );
  }

  buscarCategoria(termino: string) {
    let url = URL_SERVICIOS + '/todo/' + termino;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.categorias));
  }

  crearCategorias(categoria: CategoriaModel) {
    let url = URL_SERVICIOS + '/categoria';

    // return this.http.post( url, usuario );
    return this.http.post(url, categoria)
      .pipe(
        map((resp: any) => {
          Swal.fire('Categoria creada', categoria.nombre, 'success')
          return resp.categoria;
        }),
        catchError(err => {
          Swal.fire(err.error.mensaje, 'Categoria ya existe debe ingresar otro!!', 'error')
          return Observable.throw(err.status);
        })
      );
  }

actualizarCategoria(categoria: CategoriaModel, id: string) {
    let url = URL_SERVICIOS + '/categoria/' + id;

    return this.http.put(url, categoria)
      .pipe(
        map((resp: any) => {
          if (resp.ok === false) {
            Swal.fire('Categoria No Actualizada', resp.err.message, 'error');
          }
          else {
            Swal.fire('Categoria actualizada', categoria.nombre, 'success');
            return true;
          }
        }),
        catchError(err => {
          Swal.fire(err, err, 'error')
          return Observable.throw(err.status);
        })
      );
  }

  borrarCategoria(id: string) {
    let url = URL_SERVICIOS + '/categoria/' + id;

    return this.http.delete(url)
      .pipe(
        map((resp: any) => {

          if (resp.ok === false) {
            Swal.fire('Categoria No borrado', resp.err.message, 'error');
          }
          else {
            Swal.fire('Categoria borrado', 'El categoria a sido eliminado correctamente', 'success');
            return true;
          }
        }),
        catchError(err => {
          return Observable.throw(err.status);
        }));
  }
}