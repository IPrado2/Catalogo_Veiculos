import { Component, OnInit } from '@angular/core';
import { ShowMarcasComponent } from 'src/app/marcas/show-marcas/show-marcas.component';
import { ShowModelosComponent } from 'src/app/modelos/show-modelos/show-modelos.component';
import { ShowVeiculosComponent } from 'src/app/veiculos/show-veiculos/show-veiculos.component';
import { ShowConfigComponent } from 'src/app/config/show-config/show-config.component';
import { SharedService } from 'src/app/shared.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  
  constructor( private service:SharedService ) { 
      this.user = this.service.getUser();
  }
  user: string = '';
  showMarcas: boolean = false;
  showModelos: boolean = false;
  showVeiculos: boolean = false;
  showConfig: boolean = false;
  showAdmin: boolean = true;
  
  veiculosListLenght: number = 0;
  
  ngOnInit() {
    this.service.getVeiculosList().subscribe(({ veiculos, tamanho }) => {
      this.veiculosListLenght = tamanho;
    });
  }
  
}
