import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service'

@Component({
  selector: 'app-show-config',
  templateUrl: './show-config.component.html',
  styleUrls: ['./show-config.component.css']
})
export class ShowConfigComponent {
  
  constructor(
    private sharedService: SharedService
  ) {}
  
  token = this.sharedService.getToken();
  
}
