export class Servico {
  idServico: number;
  nome: string;
  descricao: string;
  valor: number;

  constructor(
    idServico: number = 0,
    nome: string = '',
    descricao: string = '',
    valor: number = 0
  ) {
    this.idServico = idServico;
    this.nome = nome;
    this.descricao = descricao;
    this.valor = valor;
  }
}
