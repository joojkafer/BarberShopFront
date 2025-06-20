import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Funcionario } from '../../../models/funcionario';
import { FuncionarioService } from '../../../services/funcionario.service';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, MdbFormsModule],
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.scss']
})
export class FuncionarioFormComponent implements OnInit {
  @Input() funcionario: Funcionario = new Funcionario();
  @Output() retorno = new EventEmitter<string>();

  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {}

  salvar() {
    if (this.funcionario.idUsuario > 0 && !this.funcionario.senha) {
      delete this.funcionario.senha;
    }

    if (this.funcionario.idUsuario > 0) {
      this.funcionarioService.update(this.funcionario).subscribe({
        next: () => this.retorno.emit('Funcionário atualizado com sucesso!'),
        error: (erro) => {
          console.error('Erro ao atualizar funcionário:', erro);
          this.retorno.emit('Erro: ' + erro.message);
        }
      });
    } else {
      this.funcionarioService.save(this.funcionario).subscribe({
        next: () => this.retorno.emit('Funcionário cadastrado com sucesso!'),
        error: (erro) => {
          console.error('Erro ao cadastrar funcionário:', erro);
          this.retorno.emit('Erro: ' + erro.message);
        }
      });
    }
  }

  fecharModal() {
    this.retorno.emit('');
  }

  trackById(index: number, funcionario: Funcionario): number {
    return funcionario.idUsuario;
  }
}