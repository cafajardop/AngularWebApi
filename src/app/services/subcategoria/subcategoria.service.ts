import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../../assets/config/config';
import { SubCategoriaModel } from 'src/app/models/subcategoriaModel';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  subcategoria: SubCategoriaModel;
  
  constructor(public http: HttpClient) { }

  cargarSubCategorias(desde: number = 0) {
    let url = URL_SERVICIOS + '/subcategoria?desde=' + desde;
    return this.http.get(url);
  }

  cargarSubCategoriasCurso() {
    let url = URL_SERVICIOS + '/subcategorias';
    return this.http.get(url);
  }

  cargarViewSubCategorias(id: string) {
    let url = URL_SERVICIOS + '/subCategoriaView/' + id;
    
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.subcategorias)
      );
  }

  cargarSubCategoria(id: string) {
    let url = URL_SERVICIOS + '/subcategoria/' + id;
    
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.subcategoria)
      );
  }

  buscarSubCategoria(termino: string) {
    let url = URL_SERVICIOS + '/todo/' + termino;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.subcategorias));
  }

  crearSubCategorias(subcategoria: SubCategoriaModel) {
    let url = URL_SERVICIOS + '/subcategoria';

    // return this.http.post( url, usuario );
    return this.http.post(url, subcategoria)
      .pipe(
        map((resp: any) => {
          Swal.fire('Sub-Categoria creada', subcategoria.nombre, 'success')
          return resp.subcategoria;
        }),
        catchError(err => {
          Swal.fire(err.error.mensaje, 'Sub-Categoria ya existe debe ingresar otro!!', 'error')
          return Observable.throw(err.status);
        })
      );
  }

actualizarSubCategoria(subcategoria: SubCategoriaModel, id: string) {
    let url = URL_SERVICIOS + '/subcategoria/' + id;

    return this.http.put(url, subcategoria)
      .pipe(
        map((resp: any) => {
          if (resp.ok === false) {
            Swal.fire('Sub-Categoria No Actualizada', resp.err.message, 'error');
          }
          else {
            Swal.fire('Categoria actualizada', subcategoria.nombre, 'success');
            return true;
          }
        }),
        catchError(err => {
          Swal.fire(err, err, 'error')
          return Observable.throw(err.status);
        })
      );
  }

  borrarSubCategoria(id: string) {
    let url = URL_SERVICIOS + '/subcategoria/' + id;

    return this.http.delete(url)
      .pipe(
        map((resp: any) => {

          if (resp.ok === false) {
            Swal.fire('Sub-Categoria No borrado', resp.err.message, 'error');
          }
          else {
            Swal.fire('Sub-Categoria borrado', 'El Sub-Categoria a sido eliminado correctamente', 'success');
            return true;
          }
        }),
        catchError(err => {
          return Observable.throw(err.status);
        }));
  }
}
