import { Component, OnInit } from '@angular/core';
import { CursoModel } from 'src/app/models/cursoModel';
import { CursoService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})

export class CursosComponent implements OnInit {

  cursos: CursoModel[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  iduser: string;

  constructor(
    public _cursoService: CursoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarCursos();
    this._modalUploadService.notificacion
      .subscribe(resp => this.cargarCursos());
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('cursos', id);
  }

  borrarCurso(curso: CursoModel, id: string) {
    console.log(id);
    
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta a punto de borrar al usuario: ${curso.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.value) {
        this._cursoService.borrarCurso(curso._id)
          .subscribe(borrado => {
            this.cargarCursos();
          });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  cargarCursos() {
    this.cargando = true;
    this._cursoService.cargarCursos(this.desde)
      .subscribe((resp: any) => {       
        this.totalRegistros = resp.total;
        this.cursos = resp.cursos;
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
    this.cargarCursos();
  }

  buscarCursos(termino: string) {
    // console.log (termino);
    if (termino.length <= 0) {
      this.cargarCursos();
      return;
    }
    this.cargando = true;

    this._cursoService.buscarCursos(termino)
      .subscribe((cursos: CursoModel[]) => {
        // console.log(usuarios);
        this.cursos = cursos;
        this.cargando = false;
      });
  }
}