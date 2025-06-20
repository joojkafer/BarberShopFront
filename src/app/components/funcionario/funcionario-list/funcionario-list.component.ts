import { Component, TemplateRef, ViewChild, OnInit, Inject } from '@angular/core';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { Funcionario } from '../../../models/funcionario';
import { FuncionarioService } from '../../../services/funcionario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { FuncionarioFormComponent } from '../funcionario-form/funcionario-form.component';
import { Router } from '@angular/router';
import { LoginService } from '../../../../auth/login.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, MdbFormsModule, MdbModalModule, FuncionarioFormComponent],
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.scss']
})
export class FuncionarioListComponent implements OnInit {
  loginService = Inject(LoginService);

  @ViewChild('modalFuncionarioForm') modalFuncionarioForm!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  lista: Funcionario[] = [];
  selectedFuncionario: Funcionario = new Funcionario();

  constructor(
    private funcionarioService: FuncionarioService,
    private modalService: MdbModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.funcionarioService.findAll().subscribe({
      next: (lista) => this.lista = lista,
      error: (erro) => {
        console.error('Erro ao buscar funcionários:', erro);
        Swal.fire('Erro', 'Não foi possível carregar a lista de funcionários.', 'error');
      }
    });
  }

  editar(id: number) {
    this.funcionarioService.findById(id).subscribe({
      next: (funcionario) => {
        this.selectedFuncionario = funcionario;
        this.modalRef = this.modalService.open(this.modalFuncionarioForm, { modalClass: 'modal-lg' });
      },
      error: (erro) => {
        console.error('Erro ao carregar funcionário:', erro);
        Swal.fire('Erro', 'Não foi possível carregar o funcionário para edição.', 'error');
      }
    });
  }

  excluir(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter essa ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.funcionarioService.delete(id).subscribe({
          next: () => {
            Swal.fire('Excluído!', 'Funcionário foi excluído com sucesso.', 'success').then(() => {
              this.findAll();
            });
          },
          error: (erro) => {
            console.error('Erro ao excluir funcionário:', erro);
            Swal.fire('Erro', 'Ocorreu um erro ao excluir o funcionário.', 'error');
          }
        });
      }
    });
  }

  cadastrar() {
    this.selectedFuncionario = new Funcionario();
    this.modalRef = this.modalService.open(this.modalFuncionarioForm, { modalClass: 'modal-lg' });
  }

  onRetorno(mensagem: string) {
    this.modalRef.close();
    if (mensagem.startsWith('Erro: ')) {
      Swal.fire('Erro', mensagem.replace('Erro: ', ''), 'error');
    } else if (mensagem) {
      Swal.fire('Sucesso', mensagem, 'success').then(() => {
        this.findAll();
      });
    }
  }

  trackById(index: number, funcionario: Funcionario): number {
    return funcionario.idUsuario;
  }
}