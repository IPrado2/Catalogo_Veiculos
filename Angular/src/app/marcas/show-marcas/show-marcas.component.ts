import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service'
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { UpdateMarcaComponent } from 'src/app/marcas/update-marca/update-marca.component';
import { NotificationService } from 'src/app/notification.service';
import { DeleteMarcaComponent } from 'src/app/marcas/delete-marca/delete-marca.component';
import { CreateMarcaComponent } from 'src/app/marcas/create-marca/create-marca.component';

@Component({
  selector: 'app-show-marcas',
  templateUrl: './show-marcas.component.html',
  styleUrls: ['./show-marcas.component.css']
})
export class ShowMarcasComponent {
  marcasList: any[] = [];
  currentPage = 0;
  pageSize = 10;
  totalItems: number = 0;
  
  
  constructor( private service:SharedService, public dialog: MatDialog, private notifyService : NotificationService) { }
  
  
  ngOnInit(): void {
    this.refreshMarcasList();
  }
  
  refreshMarcasList(){
    this.service.getMarcaList().subscribe(data => {
      this.marcasList = data;
      this.currentPage = 1;
      this.totalItems = this.marcasList.length;
    });
  }
  
  handlePageChange(event: any) {
    this.currentPage = event;
  }
  
   openDialog(marcaId: number): void {
    const dialogRef = this.dialog.open(UpdateMarcaComponent, {
      data: {id: marcaId},
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const nome = result;
          
          if (!nome) {
            this.notifyService.showError("", "Por favor, preencha todos os campos.");
            return;
          }
          
          this.service.updateMarca(marcaId, nome).subscribe(response => {
              this.notifyService.showSuccess("", "Marca editada com sucesso!")
              this.refreshMarcasList();
          });
      }
    });
  } 
  
  deleteDialog(marcaId: number): void {
      const dialogRef = this.dialog.open(DeleteMarcaComponent, {
        data: {id: marcaId},
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.service.deleteMarca(marcaId).subscribe(response => {
                this.notifyService.showSuccess("", "Marca removida com sucesso!")
                this.refreshMarcasList();
            });
        }
      });
  }
  
  
  createDialog(): void {
      const dialogRef = this.dialog.open(CreateMarcaComponent, {
        data: {},
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result) {
            const nome = result;
            
            if (!nome) {
              this.notifyService.showError("", "Por favor, preencha todos os campos.");
              return;
            }
            
            this.service.addMarca(nome).subscribe(response => {
                this.notifyService.showSuccess("", "Marca cadastrada com sucesso!")
                this.refreshMarcasList();
            });
        }
      });
  }
  
  searchMarcas(event: any) {
    let searchValue = event.target.value;
    if (searchValue) {
      searchValue = searchValue.toLowerCase();

      this.marcasList = this.marcasList.filter(item => {
        return item.nome.toLowerCase().includes(searchValue);
      });
    } else {
      this.refreshMarcasList();
    }
  }
  
}
