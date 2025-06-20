import { Cliente } from './cliente';
import { Barbeiro } from './barbeiro';
import { Funcionario } from './funcionario';
import { Servico } from './servico';

export class Agendamento {
  idAgendamento: number;
  horariosAgendamento: Date;
  valorTotal: number;
  cliente: Cliente;
  barbeiro: Barbeiro;
  funcionario: Funcionario;
  servicos: Servico[];

  constructor(init?: Partial<Agendamento>) {
    this.idAgendamento = init?.idAgendamento ?? 0;
    this.horariosAgendamento = init?.horariosAgendamento ? new Date(init.horariosAgendamento) : new Date();
    this.valorTotal = init?.valorTotal ?? 0;
    this.cliente = init?.cliente ?? new Cliente();
    this.barbeiro = init?.barbeiro ?? new Barbeiro();
    this.funcionario = init?.funcionario ?? new Funcionario();
    this.servicos = init?.servicos ?? [];
  }
}
