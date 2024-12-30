import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BarraLateralComponent } from "./componentes/barra-lateral/barra-lateral.component";
import { InicioComponent } from "./componentes/inicio/inicio.component";
import { CommonModule } from '@angular/common';
import { AutenticacaoService } from './servicos/autenticacao.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, BarraLateralComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trabalho-angularv2';

  constructor(private router: Router, public servicoAutenticacao: AutenticacaoService) {}

  ehPaginaLogin(): boolean {
    if(this.router.url === '/login' || this.router.url === '/cadastro') {
      return true;
    } else {
      return false;
    }
  }
  
  onLogout(): void {
    this.servicoAutenticacao.logout();
    this.router.navigate(['/login']);
  }
}
