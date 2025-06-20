// src/app/models/barbeiro.ts

export class Barbeiro {
  idBarbeiro: number = 0;
  nome: string = '';
  cpf: string = '';
  status: boolean = true;

  constructor(idBarbeiro: number = 0, nome: string = '', cpf: string = '', status: boolean = true) {
      this.idBarbeiro = idBarbeiro;
      this.nome = nome;
      this.cpf = cpf;
      this.status = status;
  }
}
