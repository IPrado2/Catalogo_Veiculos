import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sharedService: SharedService, private router: Router) { }

  canActivate(): boolean {
    if (this.sharedService.isLoggedIn()) {
      return true; // Permite o acesso à rota
    } else {
      this.router.navigate(['/login']); // Redireciona para a página de login se o usuário não estiver logado
      return false; // Impede o acesso à rota
    }
  }
}
