export class CategoriaModel {
    constructor(
        public nombre: string,
        public codigo: string,
        public _id?: string,
        public img?: string
    ) {
        this.img = "";
    }
}