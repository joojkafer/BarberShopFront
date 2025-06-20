import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Login } from '../../../../auth/login';
import { LoginService } from '../../../../auth/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login: Login = new Login();

  loginService = inject(LoginService);
  router = inject(Router);

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: (token) => {
        console.log('Token recebido:', token);
        if (token) {
          this.loginService.addToken(token);
          Swal.fire({
            icon: 'success',
            title: 'Login bem-sucedido',
            text: 'Você será redirecionado para a área administrativa.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/admin/dashboard']);
          });
        }
      },
      error: (erro) => {
        Swal.fire({
          icon: 'error',
          title: 'Falha ao realizar login',
          text: 'Por favor, tente novamente.',
        });
      }
    });
  }
}