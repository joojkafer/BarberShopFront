import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Servico } from '../../../models/servico';
import Swal from 'sweetalert2';
import { ServicoService } from '../../../services/servico.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../../auth/login.service';

@Component({
  selector: 'app-servico-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.scss']
})
export class ServicoListComponent {
  loginService = inject(LoginService);
  lista: Servico[] = [];
  currentRoute: string;
  servicoService = inject(ServicoService);
  router = inject(Router);

  constructor() {
    this.findAll();
    this.currentRoute = window.location.pathname;
  }

  findAll() {
    this.servicoService.findAll().subscribe({
      next: (list) => {
        console.log('Lista de Servicos:', list);
        this.lista = list;
      },
      error: (erro) => {
        console.error('Erro ao buscar serviços:', erro);
        Swal.fire('Erro', 'Não foi possível carregar a lista de serviços.', 'error');
      }
    });
  }

  editar(id: number) {
    this.router.navigate(['/admin/servico/edit', id]);
  }

  excluir(id: number) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: `Você não poderá reverter isso! Deseja excluir o serviço?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicoService.delete(id).subscribe({
          next: (response) => {
            Swal.fire('Excluído!', response, 'success');
            this.findAll(); // Atualiza a lista após exclusão
          },
          error: (erro) => {
            Swal.fire('Erro', 'Ocorreu um erro ao excluir o serviço: ' + erro.error, 'error');
          }
        });
      }
    });
  }
}
