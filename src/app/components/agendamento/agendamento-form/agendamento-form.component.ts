import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Agendamento } from '../../../models/agendamento';
import { ClienteService } from '../../../services/cliente.service';
import { BarbeiroService } from '../../../services/barbeiro.service';
import { ServicoService } from '../../../services/servico.service';
import { AgendamentoService } from '../../../services/agendamento.service';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule],
  selector: 'app-agendamento-form',
  templateUrl: './agendamento-form.component.html',
  styleUrls: ['./agendamento-form.component.scss']
})
export class AgendamentoFormComponent implements OnInit {
  @Input() agendamento: Agendamento = new Agendamento();
  @Output() retorno = new EventEmitter<string>();

  listaClientes: any[] = [];
  listaBarbeiros: any[] = [];
  listaServicos: any[] = [];

  constructor(
    private agendamentoService: AgendamentoService,
    private clienteService: ClienteService,
    private barbeiroService: BarbeiroService,
    private servicoService: ServicoService
  ) {}

  ngOnInit(): void {
    this.carregarDadosAuxiliares();
  }

  carregarDadosAuxiliares() {
    this.clienteService.findAll().subscribe((clientes) => (this.listaClientes = clientes));
    
    this.barbeiroService.findAll().subscribe((barbeiros) => {
      this.listaBarbeiros = barbeiros.filter(barbeiro => barbeiro.status === true);
    });
  
    this.servicoService.findAll().subscribe((servicos) => (this.listaServicos = servicos));
  }

  formatarDataParaBackend(data: Date): string {
    return data.toISOString().split('.')[0];
  }

  salvar() {
    let dataFormatada: string;
  
    if (this.agendamento.horariosAgendamento instanceof Date) {
      dataFormatada = this.formatarDataParaBackend(this.agendamento.horariosAgendamento);
    } else {
      dataFormatada = this.agendamento.horariosAgendamento as string;
    }
  
    const agendamentoParaSalvar = {
      ...this.agendamento,
      horariosAgendamento: dataFormatada,
      cliente: { idCliente: this.agendamento.cliente.idCliente },
      barbeiro: { idBarbeiro: this.agendamento.barbeiro.idBarbeiro },
      funcionario: { idUsuario: 1 },
      servicos: this.agendamento.servicos.map(servico => ({ idServico: servico.idServico }))
    };
  
    this.agendamentoService.save(agendamentoParaSalvar as unknown as Agendamento).subscribe({
      next: () => this.retorno.emit('Agendamento cadastrado com sucesso!'),
      error: (error) => {
        console.error('Erro ao cadastrar agendamento:', error);
        
        let errorMsg = 'Erro ao cadastrar agendamento';
        if (typeof error.error === 'string') {
          errorMsg = error.error;
        } else if (error.error && error.error.message) {
          errorMsg = error.error.message;
        } else {
          errorMsg = JSON.stringify(error.error);
        }
  
        this.retorno.emit('Erro: ' + errorMsg);
      }
    });
  }

  fecharModal() {
    this.retorno.emit('');
  }
}
