import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacaoService } from './servicos/autenticacao.service';

export const authGuard: CanActivateFn = (route, state) => {
  const servicoAutenticacao = inject(AutenticacaoService);
  const router = inject(Router);

  if(servicoAutenticacao.usuarioLogado) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
