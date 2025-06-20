export class Funcionario {
  idUsuario: number;
  nome: string;
  login: string;
  senha?: string;
  role: string;

  createdBy?: string;
  createDate?: Date;
  lastModifiedBy?: string;
  lastModified?: Date;

  constructor(
    idUsuario: number = 0,
    nome: string = '',
    login: string = '',
    senha: string = '',
    role: string = '',
    createdBy?: string,
    createDate?: Date,
    lastModifiedBy?: string,
    lastModified?: Date
  ) {
    this.idUsuario = idUsuario;
    this.nome = nome;
    this.login = login;
    this.senha = senha;
    this.role = role;
    this.createdBy = createdBy;
    this.createDate = createDate;
    this.lastModifiedBy = lastModifiedBy;
    this.lastModified = lastModified;
  }
}
