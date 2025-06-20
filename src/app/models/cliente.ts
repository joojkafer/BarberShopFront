export class Cliente {
  idCliente: number;
  nome: string;
  cpf: string;
  telefone: string;

  constructor(
    idCliente: number = 0,
    nome: string = '',
    cpf: string = '',
    telefone: string = ''
  ) {
    this.idCliente = idCliente;
    this.nome = nome;
    this.cpf = cpf;
    this.telefone = telefone;
  }
}
