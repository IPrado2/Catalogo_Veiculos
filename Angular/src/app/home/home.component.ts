import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  readonly PhotoUrl = "http://127.0.0.1:8000/media/";

  constructor( private service:SharedService ) { }
  
  marcasList: any[] = [];
  modelosList: any[] = [];
  veiculosList: any[] = [];
  veiculosListLenght: number = 0;
  filterOn: boolean = false;
  
  ngOnInit(): void {
    this.refreshMarcasList();
    this.refreshModelosList();
    this.refreshVeiculosList();
  }
    
  refreshMarcasList(){
    this.service.getMarcaList().subscribe(data => {
      this.marcasList = data;
    });
  }
  refreshModelosList(){
    this.service.getModelosList().subscribe(data => {
      this.modelosList = data;
    });
  }
  refreshVeiculosList(){
    this.service.getVeiculosListOrder().subscribe(({ veiculos, tamanho }) => {
      this.veiculosList = veiculos;
      this.veiculosListLenght = tamanho;
    });
  }
  
  selectedModels: string[] = [];
  selectedBrands: string[] = [];

  filterByBrand(event: any, brand: string) {
    const checked = event.target.checked;
    this.filterOn = true;
    if (checked) {
      this.selectedBrands.push(brand);
    } else {
      const index = this.selectedBrands.indexOf(brand);
      if (index !== -1) {
        this.selectedBrands.splice(index, 1);
      }
    }
    this.applyFilters();
  }

  filterByModel(model: string) {
    this.filterOn = true;
    if (!this.selectedModels.includes(model)) {
      this.selectedModels.push(model);
      this.veiculosList = this.veiculosList.filter(veiculo => veiculo.modelo === model);
    }
  }
  
  applyFilters() {
    if (this.selectedBrands.length === 0 && this.selectedModels.length === 0) {
      this.refreshVeiculosList();
    } else {
      this.veiculosList = this.service.getFilteredVeiculosList(
        this.veiculosList, this.selectedBrands, this.selectedModels
      );
    }
  }


  removeModelFilter(model: string) {
    const index = this.selectedModels.indexOf(model);
    if (index !== -1) {
      this.selectedModels.splice(index, 1);
      this.applyFilters();
    }
  }

  removeBrandFilter(brand: string) {
    const index = this.selectedBrands.indexOf(brand);
    if (index !== -1) {
      this.selectedBrands.splice(index, 1);
      this.applyFilters();
    }
  }

  resetFilter() {
    this.selectedBrands = [];
    this.selectedModels = [];
    this.filterOn = false;
    this.refreshVeiculosList();
  }


}
