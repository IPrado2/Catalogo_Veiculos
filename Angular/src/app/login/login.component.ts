import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { NotificationService } from 'src/app/notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  isLoggedIn: boolean;  
  
  constructor(private sharedService: SharedService, private toastr: ToastrService, private notifyService : NotificationService) {
    this.isLoggedIn = this.sharedService.isLoggedIn();
  }
  
  login() {
    const userElement = document.getElementById('inputUser') as HTMLInputElement;
    const user = userElement ? userElement.value : '';
    
    const passwordElement = document.getElementById('inputPassword') as HTMLInputElement;
    const password = passwordElement ? passwordElement.value : '';

    if (user === '' || password === '') {
      this.notifyService.showError('Email e senha devem ser preenchidos', '');
      return;
    }

    this.sharedService.login(user, password).subscribe(
      response => {
        this.isLoggedIn = true;
        this.notifyService.showSuccess("Login feito com sucesso!",'')
      },
      error => {
        this.notifyService.showError("Erro ao efetuar o login",'')
      }
    );
  }
}

