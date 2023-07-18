import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { NotificationService } from 'src/app/notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoggedIn: boolean;  
  
  
  constructor(private sharedService: SharedService, private toastr: ToastrService, private notifyService : NotificationService) {
    this.isLoggedIn = this.sharedService.isLoggedIn();
  }
  
  register() {
    const userElement = document.getElementById('inputUser') as HTMLInputElement;
    const user = userElement ? userElement.value : '';
    
    const passwordElement = document.getElementById('inputPassword') as HTMLInputElement;
    const password = passwordElement ? passwordElement.value : '';
    
    
    if (user === '' || password === '') {
      this.notifyService.showError('Todos os campos devem ser preenchidos', '');
      return;
    }
    
    this.sharedService.register(user, password).subscribe(
      response => {
        this.notifyService.showSuccess("Registro efetuado com sucesso!",'')
      },
      error => {
        if (error.status === 400 && error.error.error === 'Nome de usuário já está em uso') {
          this.notifyService.showError('O nome de usuário já está em uso', '');
        } else {
          this.notifyService.showError('Erro ao efetuar o registro', '');
        }
      }
    );
  }
}
