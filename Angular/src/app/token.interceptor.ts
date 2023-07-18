import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from 'src/app/notification.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private sharedService: SharedService, private notifyService : NotificationService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // Verifica se a URL é a do login ou registro
    if (request.url.endsWith('login/')) {
      return next.handle(request);
    }
    
    const token = this.sharedService.getToken(); // Obtém o token do SharedService

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error) {
          this.sharedService.logout(true);
        }
        if (error.status === 500 && error.error) {
          // Exibir mensagem de erro personalizada para o usuário
          this.notifyService.showError("Tente novamente mais tarde.","Erro no servidor!")
        }
        
        // Redirecionar para '/login' após 2 segundos
        // setTimeout(() => {
        //   this.router.navigate(['/login']);
        // }, 2000);
  
        return throwError(error);
      })
    );
  }
  
}

