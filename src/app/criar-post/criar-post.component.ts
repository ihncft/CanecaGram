import { Component } from '@angular/core';
import { PostsService } from '../servicos/posts.service';
import { AutenticacaoService } from '../servicos/autenticacao.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-criar-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './criar-post.component.html',
  styleUrl: './criar-post.component.css',
})
export class CriarPostComponent {
  titulo: string = '';
  imagem: File | null = null;

  constructor(
    private servicoPost: PostsService,
    private servicoAutenticacao: AutenticacaoService,
    private http: HttpClient
  ) {}

  aoMudarArquivo(event: any) {
    if (event.target.files.length > 0) {
      this.imagem = event.target.files[0];
    }
  }

  aoEnviar(): void {
    if (this.imagem && this.titulo) {
      const dadosForm = new FormData();
      dadosForm.append('imagem', this.imagem);

      this.http
        .post<{ imageUrl: string }>('http://localhost:3001/upload', dadosForm)
        .subscribe({
          next: (resposta) => {
            const usuario = this.servicoAutenticacao.pegarPerfil();
            const novoPost = {
              idUsuario: usuario.id,
              titulo: this.titulo,
              imagem: resposta.imageUrl,
            };
            this.servicoPost.adicionarPost(novoPost).subscribe(() => {
              alert('Postagem criada com sucesso!');
              this.titulo = '';
              this.imagem = null;
            });
          },
          error: (err) => {
            console.error('Erro ao fazer upload da imagem:', err);
          },
        });
    }
  }
}
