export class Usuario {
    constructor(
      public id: number,
      public rol: string,
      public nick: string,
      public email: string,
      public nombre?: string,
    ) {}
  }
  
  export interface loginForm {
    email: string;
    password: string;
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
  