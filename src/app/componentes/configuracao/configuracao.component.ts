import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutenticacaoService } from '../../servicos/autenticacao.service';

@Component({
  selector: 'app-configuracao',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './configuracao.component.html',
  styleUrl: './configuracao.component.css',
})
export class ConfiguracaoComponent {
  modoEscuroAtivado: boolean = false;
  novaSenha: string = '';
  novoUsuario: string = '';
  private apiUrl: string = 'http://localhost:3000/usuarios';

  constructor(
    private http: HttpClient,
    private authService: AutenticacaoService
  ) {}

  alterarModoEscuro(): void {
    this.modoEscuroAtivado = !this.modoEscuroAtivado;
    const body = document.body;
    if (this.modoEscuroAtivado) {
      body.classList.add('bg-dark', 'text-white');
    } else {
      body.classList.remove('bg-dark', 'text-white');
    }
  }

  mudarSenha(): void {
    const usuarioAtual = this.authService.pegarPerfil();
    if (usuarioAtual && this.novaSenha) {
      const idUsuario = usuarioAtual.id;

      this.http
        .patch(`${this.apiUrl}/${idUsuario}`, { senha: this.novaSenha })
        .subscribe({
          next: () => alert('Senha alterada com sucesso!'),
          error: () => alert('Erro ao alterar a senha.'),
        });
    } else {
      alert('Nenhum usuário está logado ou a senha é inválida.');
    }
  }

  mudarUsuario() {
    const usuarioAtual = this.authService.pegarPerfil();
    if (usuarioAtual && this.novoUsuario) {
      const idUsuario = usuarioAtual.id;
      this.http
        .patch(`${this.apiUrl}/${idUsuario}`, { usuario: this.novoUsuario })
        .subscribe({
          next: () => alert('Usuário alterado com sucesso!'),
          error: () => alert('Erro ao alterar o usuário.'),
        });
    } else {
      alert('Nenhum usuário está logado ou a senha é inválida.');
    }
  }
}
