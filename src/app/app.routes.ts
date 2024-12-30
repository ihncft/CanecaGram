import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { MensagemComponent } from './mensagem/mensagem.component';
import { CriarPostComponent } from './criar-post/criar-post.component';
import { ConfiguracaoComponent } from './componentes/configuracao/configuracao.component';
import { CadastroComponent } from './cadastro/cadastro.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'cadastro', component: CadastroComponent},
    {path: 'inicio', component: InicioComponent, canActivate: [authGuard]},
    {path: 'perfil', component: PerfilComponent, canActivate: [authGuard]},
    {path: 'mensagens', component: MensagemComponent, canActivate: [authGuard]},
    {path: 'criar-post', component: CriarPostComponent, canActivate: [authGuard]},
    {path: 'configuracao', component: ConfiguracaoComponent, canActivate: [authGuard]}
];
