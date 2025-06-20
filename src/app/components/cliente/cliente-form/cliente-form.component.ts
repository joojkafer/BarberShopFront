import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule],
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {
  cliente: Cliente = new Cliente();
  isEditMode: boolean = false;

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadCliente(+id);
    }
  }

  loadCliente(id: number) {
    this.clienteService.findById(id).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
      },
      error: (error) => {
        Swal.fire('Erro', 'Não foi possível carregar o cliente para edição: ' + error.message, 'error');
        this.router.navigate(['/admin/cliente']);
      }
    });
  }

  salvar() {
    if (this.isEditMode) {
      this.clienteService.update(this.cliente).subscribe({
        next: () => {
          Swal.fire('Sucesso', 'Cliente atualizado com sucesso!', 'success');
          this.router.navigate(['/admin/cliente']);
        },
        error: (erro) => {
          Swal.fire('Erro', 'Ocorreu um erro ao atualizar o cliente: ' + erro.error, 'error');
        }
      });
    } else {
      this.clienteService.save(this.cliente).subscribe({
        next: () => {
          Swal.fire('Sucesso', 'Cliente cadastrado com sucesso!', 'success');
          this.router.navigate(['/admin/cliente']);
        },
        error: (erro) => {
          Swal.fire('Erro', 'Ocorreu um erro ao cadastrar o cliente: ' + erro.error, 'error');
        }
      });
    }
  }
}