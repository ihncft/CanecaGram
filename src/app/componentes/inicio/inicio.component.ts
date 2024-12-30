import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../../servicos/autenticacao.service';
import { Router } from '@angular/router';
import { PostsService } from '../../servicos/posts.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  posts: any[] = [];
  usuarioLogado: any = null;

  constructor(private servicoAutenticacao: AutenticacaoService, private router: Router, private servicoPost: PostsService) { }

  ngOnInit(): void {
    this.usuarioLogado = this.servicoAutenticacao.pegarPerfil();
    this.servicoPost.pegarPosts().subscribe(dados => {
      this.posts = dados;
    })
  }

  onLogout(): void {
    this.servicoAutenticacao.logout();
    this.router.navigate(["/login"])
  }
}
