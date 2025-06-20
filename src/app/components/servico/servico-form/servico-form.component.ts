import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Servico } from '../../../models/servico';
import { ServicoService } from '../../../services/servico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servico-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule],
  templateUrl: './servico-form.component.html',
  styleUrls: ['./servico-form.component.scss']
})
export class ServicoFormComponent implements OnInit {
  servico: Servico = new Servico(0, '', '', 0);
  valorFormatado: string = '';
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicoService: ServicoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadServico(+id);
    }
  }

  loadServico(id: number) {
    this.servicoService.findById(id).subscribe({
      next: (servico) => {
        this.servico = servico;
        this.valorFormatado = this.formatarParaReal(servico.valor);
      },
      error: (error) => {
        Swal.fire('Erro', 'Não foi possível carregar o serviço para edição: ' + error.message, 'error');
        this.router.navigate(['/admin/servico']);
      }
    });
  }

  formatarParaReal(valor: number): string {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  }

  formatarValor() {
    if (this.valorFormatado) {
      const valorNumerico = parseFloat(
        this.valorFormatado.replace('R$', '').replace(',', '.').trim()
      );
      this.servico.valor = valorNumerico;
      this.valorFormatado = this.formatarParaReal(valorNumerico);
    }
  }

  salvar() {
    this.formatarValor(); // Certifique-se de que o valor está no formato numérico

    if (this.isEditMode) {
      this.servicoService.update(this.servico).subscribe({
        next: (response) => {
          Swal.fire('Sucesso', 'Serviço atualizado com sucesso!', 'success');
          this.router.navigate(['/admin/servico']);
        },
        error: (erro) => {
          Swal.fire('Erro', 'Ocorreu um erro ao atualizar o serviço: ' + erro.error, 'error');
        }
      });
    } else {
      this.servicoService.save(this.servico).subscribe({
        next: (response) => {
          Swal.fire('Sucesso', 'Serviço cadastrado com sucesso!', 'success');
          this.router.navigate(['/admin/servico']);
        },
        error: (erro) => {
          Swal.fire('Erro', 'Ocorreu um erro ao cadastrar o serviço: ' + erro.error, 'error');
        }
      });
    }
  }
}
