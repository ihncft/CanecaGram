import { Component } from '@angular/core';
import { AutenticacaoService } from '../servicos/autenticacao.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usuario: string = '';
  senha: string = '';
  mensagemErro = '';

  constructor(
    private servicoAutenticacao: AutenticacaoService,
    private router: Router
  ) {}

  irParaCadastro(): void {
    this.router.navigate(['/cadastro']);
  }

  onLogin(): void {
    this.servicoAutenticacao.login(this.usuario, this.senha).subscribe({
      next: (user) => {
        if (user.length) {
          console.log('Login deu certo!');
          this.router.navigate(['/inicio']);
        } else {
          this.mensagemErro = 'Usuário ou senha incorretos!';
        }
      },
      error: (erro) => {
        console.error('Deu erro no login: ', erro);
        this.mensagemErro = 'Erro ao tentar realizar o login!';
      },
    });
  }
}
