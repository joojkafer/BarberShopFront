export class Funcionario {
  idUsuario: number;
  nome: string;
  login: string;
  senha?: string;
  role: string;

  constructor(
    idUsuario: number = 0,
    nome: string = '',
    login: string = '',
    senha: string = '',
    role: string = ''
  ) {
    this.idUsuario = idUsuario;
    this.nome = nome;
    this.login = login;
    this.senha = senha;
    this.role = role;
  }
}