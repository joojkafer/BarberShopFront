export class Barbeiro {
  idBarbeiro: number = 0;
  nome: string = '';
  cpf: string = '';
  status: boolean = true;

  createdBy?: string;
  createDate?: Date;
  lastModifiedBy?: string;
  lastModified?: Date;

  constructor(
    idBarbeiro: number = 0,
    nome: string = '',
    cpf: string = '',
    status: boolean = true,
    createdBy?: string,
    createDate?: Date,
    lastModifiedBy?: string,
    lastModified?: Date
  ) {
    this.idBarbeiro = idBarbeiro;
    this.nome = nome;
    this.cpf = cpf;
    this.status = status;
    this.createdBy = createdBy;
    this.createDate = createDate;
    this.lastModifiedBy = lastModifiedBy;
    this.lastModified = lastModified;
  }
}
