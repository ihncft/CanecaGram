import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AutenticacaoService } from '../../servicos/autenticacao.service';

@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './barra-lateral.component.html',
  styleUrl: './barra-lateral.component.css',
})
export class BarraLateralComponent {
  constructor(
    private router: Router,
    public servicoAutenticacao: AutenticacaoService
  ) {}

  onLogout(): void {
    this.servicoAutenticacao.logout();
    this.router.navigate(['/login']);
  }
}
