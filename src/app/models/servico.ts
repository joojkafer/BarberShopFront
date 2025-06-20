export class Servico {
  idServico: number;
  nome: string;
  descricao: string;
  valor: number;

  createdBy?: string;
  createDate?: Date;
  lastModified?: Date;
  lastModifiedBy?: string;

  constructor(
    idServico: number = 0,
    nome: string = '',
    descricao: string = '',
    valor: number = 0,
    createdBy?: string,
    createDate?: Date,
    lastModified?: Date,
    lastModifiedBy?: string
  ) {
    this.idServico = idServico;
    this.nome = nome;
    this.descricao = descricao;
    this.valor = valor;
    this.createdBy = createdBy;
    this.createDate = createDate;
    this.lastModified = lastModified;
    this.lastModifiedBy = lastModifiedBy;
  }
}
