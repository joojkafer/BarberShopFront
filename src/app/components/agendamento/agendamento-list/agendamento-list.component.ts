import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { Agendamento } from '../../../models/agendamento';
import { AgendamentoService } from '../../../services/agendamento.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { AgendamentoFormComponent } from '../agendamento-form/agendamento-form.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, MdbFormsModule, MdbModalModule, AgendamentoFormComponent],
  selector: 'app-agendamento-list',
  templateUrl: './agendamento-list.component.html',
  styleUrls: ['./agendamento-list.component.scss']
})
export class AgendamentoListComponent implements OnInit {
  @ViewChild('modalAgendamentoForm') modalAgendamentoForm!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  listaAgendamentos: Agendamento[] = [];
  agendamentoEdit: Agendamento = new Agendamento();

  constructor(
    private agendamentoService: AgendamentoService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    this.carregarAgendamentos();
  }

  formatarDataParaBackend(data: string): string {
    const date = new Date(data);
    const pad = (num: number) => (num < 10 ? '0' + num : num.toString());
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  carregarAgendamentos() {
    this.agendamentoService.findAll().subscribe({
      next: (agendamentos) => this.listaAgendamentos = agendamentos,
      error: (error) => {
        console.error('Erro ao carregar agendamentos:', error);
        Swal.fire('Erro', 'Não foi possível carregar a lista de agendamentos: ' + (error.error || error.message), 'error');
      }
    });
  }

  novo() {
    this.agendamentoEdit = new Agendamento();
    this.modalRef = this.modalService.open(this.modalAgendamentoForm, { modalClass: 'modal-lg' });
  }

  editar(agendamento: Agendamento) {
    this.agendamentoEdit = { ...agendamento };
    this.modalRef = this.modalService.open(this.modalAgendamentoForm, { modalClass: 'modal-lg' });
  }
  
  excluir(idAgendamento: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja excluir este agendamento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.agendamentoService.delete(idAgendamento).subscribe({
          next: () => {
            Swal.fire('Excluído!', 'O agendamento foi excluído com sucesso.', 'success').then(() => {
              this.carregarAgendamentos();
            });
          },
          error: (error) => {
            console.error('Erro ao excluir agendamento:', error);
            let errorMsg = 'Erro ao excluir agendamento';
            if (typeof error.error === 'string') {
              errorMsg = error.error;
            } else if (error.error && error.error.message) {
              errorMsg = error.error.message;
            } else {
              errorMsg = JSON.stringify(error.error);
            }
            Swal.fire('Erro', errorMsg, 'error');
          }
        });
      }
    });
  }

  retornoForm(mensagem: string) {
    this.modalRef.close();
  
    if (mensagem.startsWith('Erro: ')) {
      Swal.fire('Erro', mensagem.replace('Erro: ', ''), 'error');
    } else if (mensagem) {
      Swal.fire('Sucesso', mensagem, 'success').then(() => {
        this.carregarAgendamentos();
      });
    }
  }

  trackById(index: number, agendamento: Agendamento): number {
    return agendamento.idAgendamento;
  }
}
