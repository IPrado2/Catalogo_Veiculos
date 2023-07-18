import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { SharedFileService } from 'src/app/shared-file.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateVeiculoComponent } from 'src/app/veiculos/update-veiculo/update-veiculo.component';
import { NotificationService } from 'src/app/notification.service';
import { DeleteVeiculoComponent } from 'src/app/veiculos/delete-veiculo/delete-veiculo.component';
import { CreateVeiculoComponent } from 'src/app/veiculos/create-veiculo/create-veiculo.component';
import { DialogData } from '../update-veiculo/update-veiculo.component';

@Component({
  selector: 'app-show-veiculos',
  templateUrl: './show-veiculos.component.html',
  styleUrls: ['./show-veiculos.component.css']
})
export class ShowVeiculosComponent implements OnInit {
  veiculosList: any[] = [];
  currentPage = 0;
  pageSize = 10;
  totalItems: number = 0;
  selectedFile: File | null = null;

  constructor(
    private service: SharedService,
    public dialog: MatDialog,
    private notifyService: NotificationService,
    private sharedFileService: SharedFileService
  ) {}

  ngOnInit(): void {
    this.refreshVeiculosList();
  }

  refreshVeiculosList() {
    this.service.getVeiculosList().subscribe(({ veiculos }) => {
      this.veiculosList = veiculos;
      this.currentPage = 1;
      this.totalItems = this.veiculosList.length;
    });
  }

  handlePageChange(event: any) {
    this.currentPage = event;
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  openDialog(veiculoId: number): void {
    this.service.getVeiculoById(veiculoId).subscribe((veiculo) => {
      const valorFormatado = parseFloat(veiculo.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 });      
      const data: DialogData = {
        id: veiculoId,
        nome: veiculo.nome,
        marca_id: veiculo.marca,
        modelo_id: veiculo.modelo,
        f_name: veiculo.foto,
        valor: valorFormatado
      };
      
      this.sharedFileService.clearSelectedFile();
      
      const dialogRef = this.dialog.open(UpdateVeiculoComponent, {
        data: data
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const nome = result.nome;
          const marcaId = result.marca_id;
          const modeloId = result.modelo_id;
          const valor = result.valor;
          const valorSemSeparador = valor.replace('.', '').replace(',', '.');
          const valorDecimal = parseFloat(valorSemSeparador).toFixed(2);
          const foto_name = this.sharedFileService.getSelectedFile()?.name || data.f_name; //Caso não inserir imagem utiliza o nome da imagem que já existe.
          const foto = this.sharedFileService.getSelectedFile();

          // Verificar se os campos estão preenchidos
          if (!nome || !marcaId || !modeloId || !valor) {
            this.notifyService.showError('', 'Por favor, preencha todos os campos.');
            return;
          }
          
          
          const formData: FormData = new FormData();
          formData.append('nome', nome);
          formData.append('marca_id', marcaId.toString());
          formData.append('modelo_id', modeloId.toString());
          formData.append('valor', valorDecimal);
          formData.append('foto', foto_name);

          this.service.updateVeiculos(veiculoId, formData).subscribe((response) => {
            
            if(foto){
              this.service.uploadPhoto(foto).subscribe();
            }
            
            this.notifyService.showSuccess('', 'Veiculo editada com sucesso!');
            this.refreshVeiculosList();
          });
        }
      });
    });
  }

  deleteDialog(veiculoId: number): void {
    const dialogRef = this.dialog.open(DeleteVeiculoComponent, {
      data: { id: veiculoId }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.deleteVeiculos(veiculoId).subscribe((response) => {
          this.notifyService.showSuccess('', 'Veiculo removida com sucesso!');
          this.refreshVeiculosList();
        });
      }
    });
  }

  createDialog(): void {
    const dialogRef = this.dialog.open(CreateVeiculoComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const nome = result.nome;
        const marcaId = result.marca_id;
        const modeloId = result.modelo_id;
        const valor = result.valor;
        const valorSemSeparador = valor.replace('.', '').replace(',', '.');
        const valorDecimal = parseFloat(valorSemSeparador).toFixed(2);
        const foto_name = this.sharedFileService.getSelectedFile()?.name || 'teste.png';
        const foto = this.sharedFileService.getSelectedFile();

        // Verificar se os campos estão preenchidos
        if (!nome || !marcaId || !modeloId || !valor) {
          this.notifyService.showError('', 'Por favor, preencha todos os campos.');
          return;
        }

        this.service.addVeiculos(nome, marcaId, modeloId, Number(valorDecimal), foto_name).subscribe((response) => {
          
          if(foto){
            this.service.uploadPhoto(foto).subscribe();
          }
          
          this.notifyService.showSuccess('', 'Veiculo cadastrada com sucesso!');
          this.refreshVeiculosList();
        });
      }
    });
  }
  
  searchVeiculos(event: any) {
    let searchValue = event.target.value;
    if (searchValue) {
      searchValue = searchValue.toLowerCase();

      this.veiculosList = this.veiculosList.filter(item => {
        return item.nome.toLowerCase().includes(searchValue);
      });
    } else {
      this.refreshVeiculosList();
    }
  }
  
}
