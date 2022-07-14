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
  