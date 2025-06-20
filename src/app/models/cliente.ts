export class Cliente {
  idCliente: number;
  nome: string;
  cpf: string;
  telefone: string;

  createdBy?: string;
  createDate?: Date;
  lastModifiedBy?: string;
  lastModified?: Date;

  constructor(
    idCliente: number = 0,
    nome: string = '',
    cpf: string = '',
    telefone: string = '',
    createdBy?: string,
    createDate?: Date,
    lastModifiedBy?: string,
    lastModified?: Date
  ) {
    this.idCliente = idCliente;
    this.nome = nome;
    this.cpf = cpf;
    this.telefone = telefone;
    this.createdBy = createdBy;
    this.createDate = createDate;
    this.lastModifiedBy = lastModifiedBy;
    this.lastModified = lastModified;
  }
}
