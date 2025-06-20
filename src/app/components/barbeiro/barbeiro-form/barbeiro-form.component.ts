import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Barbeiro } from '../../../models/barbeiro';
import { BarbeiroService } from '../../../services/barbeiro.service';

@Component({
  selector: 'app-barbeiro-form',
  templateUrl: './barbeiro-form.component.html',
  styleUrls: ['./barbeiro-form.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class BarbeiroFormComponent implements OnInit {
  @Input() barbeiro: Barbeiro = new Barbeiro();
  @Output() retorno = new EventEmitter<string>();

  isEditMode: boolean = false;

  constructor(private barbeiroService: BarbeiroService) { }

  ngOnInit(): void {
    if (this.barbeiro && this.barbeiro.idBarbeiro > 0) {
      this.isEditMode = true;
    }
  }

  salvar(form: any) {
    if (form.valid) {
      if (this.isEditMode) {
        this.barbeiroService.update(this.barbeiro).subscribe({
          next: (response) => {
            this.retorno.emit(response);
          },
          error: (erro) => {
            Swal.fire('Erro', 'Ocorreu um erro ao atualizar o barbeiro: ' + erro.error, 'error');
          }
        });
      } else {
        this.barbeiroService.save(this.barbeiro).subscribe({
          next: (response) => {
            this.retorno.emit(response);
            this.resetForm(form); // Reseta o formulário após salvar
          },
          error: (erro) => {
            Swal.fire('Erro', 'Ocorreu um erro ao cadastrar o barbeiro: ' + erro.error, 'error');
          }
        });
      }
    }
  }

  resetForm(form: any) {
    form.resetForm(); // Reseta o formulário do Angular
    this.barbeiro = new Barbeiro(); // Cria uma nova instância vazia
    this.isEditMode = false; // Garante que não esteja no modo de edição
  }

  cancelar() {
    this.retorno.emit('Operação cancelada.');
  }
}
