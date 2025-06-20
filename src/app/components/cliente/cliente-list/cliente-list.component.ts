import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../../models/cliente';
import Swal from 'sweetalert2';
import { ClienteService } from '../../../services/cliente.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../../auth/login.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})

export class ClienteListComponent {
  loginService = inject(LoginService);

  lista: Cliente[] = [];
  currentRoute: string;
  clienteService = inject(ClienteService);
  router = inject(Router);

  constructor() {
    this.findAll();
    this.currentRoute = window.location.pathname;
  }

  findAll() {
    this.clienteService.findAll().subscribe({
      next: lista => {
        console.log('Lista de clientes:', lista);
        this.lista = lista;
      },
      error: erro => {
        console.error('Erro ao buscar clientes:', erro);
        Swal.fire('Erro', 'Não foi possível carregar a lista de clientes.', 'error');
      }
    });
  }

  editar(id: number) {
    this.router.navigate(['/admin/cliente/edit', id]);
  }

  excluir(id: number) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Deseja realmente excluir este cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(id).subscribe({
          next: (response) => {
            Swal.fire('Excluído!', response, 'success');
            this.findAll(); // Atualiza a lista após a exclusão
          },
          error: (erro) => {
            Swal.fire('Erro', 'Ocorreu um erro ao excluir o cliente: ' + erro.error, 'error');
          }
        });
      }
    });
  }
}