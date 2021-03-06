import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../../assets/config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/imagenes';
    if (!img) {
      return url + '/usuarios/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }
    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'curso':
        url += '/cursos/' + img;
        break;
      case 'categoria':
        url += '/categorias/' + img;
        break;
      default:
        console.log('tipo de imagen no existe, usuario, medicos, hospitales');
        url += '/usuarios/xxx';    
    }   
    return url;
  }
}
