import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { CursoModel } from 'src/app/models/cursoModel';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  curso: CursoModel;
  
  constructor(public http: HttpClient) { }

  cargarCursos(desde: number = 0) {
    let url = URL_SERVICIOS + '/curso?desde=' + desde;
    return this.http.get(url);
  }

  cargarCurso(id: string) {
    let url = URL_SERVICIOS + '/curso/' + id;
    
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.curso)
      );
  }

  cargarCursoCategoria(id: string) {
    let url = URL_SERVICIOS + '/cursoView/' + id;
    
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.curso)
      );
  }

  buscarCursos(termino: string) {
    let url = URL_SERVICIOS + '/todo/' + termino;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.cursos));
  }

  crearCurso(curso: CursoModel) {
    let headers = new Headers();
    let url = URL_SERVICIOS + '/curso';

    // return this.http.post( url, usuario );
    return this.http.post(url, curso)
      .pipe(
        map((resp: any) => {
          Swal.fire('Curso creado', curso.nombre, 'success')
          return resp.curso;
        }),
        catchError(err => {
          Swal.fire(err.error.mensaje, 'Usuario ya existe debe ingresar otro!!', 'error')
          return Observable.throw(err.status);
        })
      );
  }

actualizarCurso(curso: CursoModel, id: string) {
    let url = URL_SERVICIOS + '/curso/' + id;

    return this.http.put(url, curso)
      .pipe(
        map((resp: any) => {
          if (resp.ok === false) {
            Swal.fire('Curso No Actualizado', resp.err.message, 'error');
          }
          else {
            Swal.fire('Usuario actualizado', curso.nombre, 'success');
            return true;
          }
        }),
        catchError(err => {
          Swal.fire(err, err, 'error')
          return Observable.throw(err.status);
        })
      );
  }

  borrarCurso(id: string) {
    let url = URL_SERVICIOS + '/curso/' + id;

    return this.http.delete(url)
      .pipe(
        map((resp: any) => {

          if (resp.ok === false) {
            Swal.fire('Curso No borrado', resp.err.message, 'error');
          }
          else {
            Swal.fire('Curso borrado', 'El curso a sido eliminado correctamente', 'success');
            return true;
          }
        }),
        catchError(err => {
          return Observable.throw(err.status);
        }));
  }
}
