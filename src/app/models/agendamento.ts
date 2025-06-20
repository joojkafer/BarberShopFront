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

  createdBy?: string;
  createDate?: Date;
  lastModifiedBy?: string;
  lastModified?: Date;

  constructor(init?: Partial<Agendamento>) {
    this.idAgendamento = init?.idAgendamento ?? 0;
    this.horariosAgendamento = init?.horariosAgendamento ? new Date(init.horariosAgendamento) : new Date();
    this.valorTotal = init?.valorTotal ?? 0;
    this.cliente = init?.cliente ?? new Cliente();
    this.barbeiro = init?.barbeiro ?? new Barbeiro();
    this.funcionario = init?.funcionario ?? new Funcionario();
    this.servicos = init?.servicos ?? [];
    this.createdBy = init?.createdBy;
    this.createDate = init?.createDate ? new Date(init.createDate) : undefined;
    this.lastModifiedBy = init?.lastModifiedBy;
    this.lastModified = init?.lastModified ? new Date(init.lastModified) : undefined;
  }
}
