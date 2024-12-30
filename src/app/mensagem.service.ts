import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {
  private apiUrl = 'http://localhost:3000/mensagens'
  private mensagens: any[] = [];
  private assuntoMensagem = new Subject<any[]>();

  constructor(private http: HttpClient) { }

  adicionar(mensagem: any) {
    this.http.post<any>(this.apiUrl, mensagem).subscribe(() => {
      this.mensagens.push(mensagem);
      this.assuntoMensagem.next(this.mensagens);
    })
  }

  pegarMensagens(): Observable<any[]> {
    this.http.get<any[]>(this.apiUrl).subscribe(mensagens => {
      this.mensagens = mensagens;
      this.assuntoMensagem.next(this.mensagens);
    })
    return this.assuntoMensagem.asObservable();
  }

  limpar() {
    this.mensagens = [];
    this.assuntoMensagem.next(this.mensagens);
  }

}
