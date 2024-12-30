import { Component, OnInit } from '@angular/core';
import { MensagemService } from '../mensagem.service';
import { CommonModule } from '@angular/common';
import { timestamp } from 'rxjs';
import { AutenticacaoService } from '../servicos/autenticacao.service';

@Component({
  selector: 'app-mensagem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensagem.component.html',
  styleUrl: './mensagem.component.css',
})
export class MensagemComponent implements OnInit {
  mensagens: any[] = [];

  constructor(
    private servicoMensagem: MensagemService,
    private servicoAutenticacao: AutenticacaoService
  ) {}

  ngOnInit(): void {
    this.servicoMensagem.pegarMensagens().subscribe((mensagens) => {
      this.mensagens = mensagens;
    });
  }

  adicionarMensagem(novaMensagem: string, paraUsuario: string) {
    const usuarioLogado = this.servicoAutenticacao.pegarPerfil();
    if (usuarioLogado) {
      const agora = new Date();
      const formattedDate = agora.toLocaleString('pt-BR', {
        hour: '2-digit', 
        minute: '2-digit', 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      });
      const mensagem = {
        from: usuarioLogado.usuario,
        to: paraUsuario,
        content: novaMensagem,
        timestamp: formattedDate
      };
      this.servicoMensagem.adicionar(mensagem);
    } else {
      console.error("Nenhum usuário logado!");
    }
  }

  limparMensagens() {
    this.servicoMensagem.limpar();
  }
}
