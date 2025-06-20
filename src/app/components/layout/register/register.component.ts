import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Registro } from '../../../../auth/registro';
import { LoginService } from '../../../../auth/login.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registro: Registro = new Registro();

  loginService = inject(LoginService);
  router = inject(Router);

  registrar() {
    if (this.registro.password !== this.registro.confirmarSenha) {
      Swal.fire({
        icon: 'warning',
        title: 'Senhas não coincidem',
        text: 'Por favor, verifique se as senhas digitadas são iguais.',
      });
      return;
    }

    this.loginService.registrar(this.registro).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Registro bem-sucedido',
          text: 'Sua conta foi criada com sucesso. Você será redirecionado para o login.',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (erro: HttpErrorResponse) => {
        let mensagemErro = 'Ocorreu um erro ao registrar. Por favor, tente novamente.';
        
        if (erro.error instanceof ErrorEvent) {
          mensagemErro = `Erro: ${erro.error.message}`;
        } else if (erro.error instanceof String || typeof erro.error === 'string') {
          mensagemErro = String(erro.error);
        } else if (erro.error && erro.error.message) {
          mensagemErro = erro.error.message;
        }

        Swal.fire({
          icon: 'error',
          title: 'Falha no registro',
          text: mensagemErro,
        });
      }
    });
  }
}
