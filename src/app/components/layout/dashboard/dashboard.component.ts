import { Component, OnInit } from '@angular/core';
import { AgendamentoListComponent } from '../../agendamento/agendamento-list/agendamento-list.component';
import { AgendamentoService } from '../../../services/agendamento.service';
import { Agendamento } from '../../../models/agendamento';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AgendamentoListComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  listaAgendamentos: Agendamento[] = [];

  constructor(private agendamentoService: AgendamentoService) {}

  ngOnInit(): void {
    this.getAgendamentos();
  }

  getAgendamentos(): void {
    this.agendamentoService.findAll().subscribe({
      next: (agendamentos) => {
        this.listaAgendamentos = agendamentos.map(agendamento => {
          return {
            ...agendamento,
            horariosAgendamento: new Date(agendamento.horariosAgendamento) // Converter string para Date se necessário
          };
        });
      },
      error: (error) => {
        console.error('Erro ao carregar agendamentos:', error);
        Swal.fire('Erro', 'Não foi possível carregar a lista de agendamentos: ' + error.message, 'error');
      }
    });
  }
}