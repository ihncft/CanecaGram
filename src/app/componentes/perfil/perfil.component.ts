import { Component, Input, OnInit } from '@angular/core';
import { AutenticacaoService } from '../../servicos/autenticacao.service';
import { PostsService } from '../../servicos/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  perfilDoUsuario: any = null;
  postagensUsuario: any[] = [];

  constructor(
    private servicoAutenticacao: AutenticacaoService,
    private servicoPost: PostsService
  ) {}

  ngOnInit(): void {
    this.perfilDoUsuario = this.servicoAutenticacao.pegarPerfil();
    if (this.perfilDoUsuario?.usuario) {
      this.servicoPost
        .pegarPostsUsuario(this.perfilDoUsuario.usuario)
        .subscribe({
          next: (dados) => {
            console.log('Postagens do usuário: ', dados);
            this.postagensUsuario = dados;
          },
          error: (error) => {
            console.error('Erro ao buscar postagens do usuário:', error);
          },
        });
    }
  }
}
