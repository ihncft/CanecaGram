import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  templateUrl: './cadastro.component.html',
  imports: [FormsModule],
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  novoUsuario = {
    usuario: '',
    senha: '',
    nome: '',
    email: '',
    bio: '',
  };
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient, private router: Router) {}

  onCadastro(): void {
    this.http.post(this.apiUrl, this.novoUsuario).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro no cadastro:', err);
        alert('Erro ao realizar cadastro.');
      },
    });
  }
}
