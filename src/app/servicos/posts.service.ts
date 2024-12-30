import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postsUrl = 'http://localhost:3000/posts';
  private usuariosUrl = 'http://localhost:3000/usuarios';
  private uploadUrl = 'http://localhost:3001/upload';

  constructor(private http: HttpClient) {}

  pegarPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.postsUrl);
  }

  pegarPostsUsuario(usuario: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.usuariosUrl}?usuario=${usuario}`).pipe(
      switchMap((usuarios) => {
        if (usuarios.length === 0) {
          console.error('Nenhum usuário encontrado com esse nome');
          return [];
        }
        const idUsuario = usuarios[0].id;
        console.log('ID do usuário: ', idUsuario);
        return this.http.get<any[]>(`${this.postsUrl}?idUsuario=${idUsuario}`);
      })
    );
  }

  adicionarPost(post: any): Observable<any> {
    return this.http.post<any>(this.postsUrl, post);
  }

  uploadImage(imagem: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imagem);
    return this.http.post<any>(this.uploadUrl, formData);
  }
}
