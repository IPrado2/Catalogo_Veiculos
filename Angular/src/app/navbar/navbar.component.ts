import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  isLoggedIn: boolean;
  user: string = '';
  
  constructor(private sharedService: SharedService) {
    this.isLoggedIn = this.sharedService.isLoggedIn();
    this.user = this.sharedService.getUser();
  }
  
  logout() {
    this.sharedService.logout();
    this.isLoggedIn = false;
  }
  
}
