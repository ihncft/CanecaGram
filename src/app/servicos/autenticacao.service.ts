import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private apiURL = "http://localhost:3000/usuarios";
  usuarioLogado: any = null;
  nomeUsuario: string = "";

  constructor(private http: HttpClient) { }

  login(usuario: string, senha: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}?usuario=${usuario}&senha=${senha}`).pipe(
      tap(user => {
        if(user.length) {
          this.usuarioLogado = user[0];
          this.nomeUsuario = usuario;
          console.log("Usuário logado: ", this.usuarioLogado);
        }
      })
    )
  }

  pegarPerfil(): any {
    return this.usuarioLogado;
  }

  logout(): void {
    this.usuarioLogado = null;
    this.nomeUsuario = "";
  }
}
