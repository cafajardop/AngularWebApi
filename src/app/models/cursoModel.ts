export class CursoModel {
    constructor(
        public nombre: string,
        public img?: string,
        public _id?: string,
        public descripcion?:string,
        public descripcionText?:string,
        public comandos?:string
    ) {
        this.img = "";
    }
}