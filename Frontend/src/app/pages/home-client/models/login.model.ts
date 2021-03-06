export class Usuario {
    constructor(
      public id: number,
      public rol: string,
      public nick: string,
      public email: string,
      public nombre: string,
      public token: string
    ) {}
  }
  
  export interface loginForm {
    email: string;
    password: string;
  }

  export interface registrarmedidas{
    altura : number;
    peso : number;
    imc : number;
    brazo : number;
    cintura : number;
    muslo : number;
  }

  export interface registerForm {
     rol: string,
     nick: string,
     email: string,
     password: string,
     nombre?: string,
     apellidos?: string,
     edad?: number,
     telefono?: number,
     titulacion?: string,
     imagen?: string
  }

  export interface textForm {
    mensaje: string,
    ide: number,
    idr: number
 }

 export interface newpost {
  imagen: string,
  titulo: string,
  descripcion: string,
  ubi: string
}

  