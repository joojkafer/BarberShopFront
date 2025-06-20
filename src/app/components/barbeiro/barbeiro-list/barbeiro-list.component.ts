// src/app/components/barbeiro-list/barbeiro-list.component.ts

import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';

import Swal from 'sweetalert2';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { BarbeiroFormComponent } from '../barbeiro-form/barbeiro-form.component';
import { FormsModule } from '@angular/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { BarbeiroService } from '../../../services/barbeiro.service';
import { Barbeiro } from '../../../models/barbeiro';
import { LoginService } from '../../../../auth/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barbeiro-list',
  templateUrl: './barbeiro-list.component.html',
  styleUrls: ['./barbeiro-list.component.scss'],
  standalone: true,
  imports: [BarbeiroFormComponent, FormsModule, MdbModalModule, CommonModule]
})
export class BarbeiroListComponent implements OnInit {


loginService = inject(LoginService);



  barbeiros: Barbeiro[] = [];
  barbeiroEdit: Barbeiro = new Barbeiro();
  @ViewChild('modalBarbeiro') modalBarbeiro!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor(private barbeiroService: BarbeiroService, private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.barbeiroService.findAll().subscribe({
      next: (data) => {
        this.barbeiros = data;
        console.log('Lista de barbeiros:', this.barbeiros);
      },
      error: (error) => {
        Swal.fire('Erro', 'Não foi possível carregar os barbeiros: ' + error.message, 'error');
      }
    });
  }

  editarBarbeiro(barbeiro: Barbeiro) {
    this.barbeiroEdit = { ...barbeiro }; // Clone do objeto
    this.abrirModalBarbeiro();
  }

  excluirBarbeiro(barbeiro: Barbeiro) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: `Você não poderá reverter isso! Deseja excluir o barbeiro "${barbeiro.nome}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.barbeiroService.delete(barbeiro.idBarbeiro).subscribe({
          next: (response) => {
            Swal.fire('Excluído!', response, 'success');
            this.findAll();
          },
          error: (erro) => {
            Swal.fire('Erro', 'Ocorreu um erro ao excluir o barbeiro: ' + erro.error, 'error');
          }
        });
      }
    });
  }

  abrirModalBarbeiro() {
    this.modalRef = this.modalService.open(this.modalBarbeiro, { modalClass: 'modal-lg' });
  }

  handleRetorno(mensagem: string) {
    this.modalRef.close();
    Swal.fire({
      title: mensagem,
      icon: 'success'
    });
    this.findAll();
  }
}
