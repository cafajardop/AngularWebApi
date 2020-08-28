export class UsuarioModel {
    constructor(
        public nombres: string,
        public apellidos: string,
        public telefono: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) {
        this.img="";        
        this.google=false;        
     }
}