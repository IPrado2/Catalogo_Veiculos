import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service'
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { UpdateModeloComponent } from 'src/app/modelos/update-modelo/update-modelo.component';
import { NotificationService } from 'src/app/notification.service';
import { DeleteModeloComponent } from 'src/app/modelos/delete-modelo/delete-modelo.component';
import { CreateModeloComponent } from 'src/app/modelos/create-modelo/create-modelo.component';

@Component({
  selector: 'app-show-modelos',
  templateUrl: './show-modelos.component.html',
  styleUrls: ['./show-modelos.component.css']
})
export class ShowModelosComponent {
  modelosList: any[] = [];
  currentPage = 0;
  pageSize = 10;
  totalItems: number = 0;

  
  constructor( private service:SharedService, public dialog: MatDialog, private notifyService : NotificationService ) { }
  
  
  ngOnInit(): void {
    this.refreshModelosList();
  }
  
  refreshModelosList(){
    this.service.getModelosList().subscribe(data => {
      this.modelosList = data;
      this.currentPage = 1;
      this.totalItems = this.modelosList.length;
    });
  }
  
  handlePageChange(event: any) {
    this.currentPage = event;
  }
  
  openDialog(modeloId: number): void {
    const dialogRef = this.dialog.open(UpdateModeloComponent, {
      data: {id: modeloId},
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const nome = result;
          
          if (!nome) {
            this.notifyService.showError("", "Por favor, preencha todos os campos.");
            return;
          }
          
          
          this.service.updateModelos(modeloId, nome).subscribe(response => {
              this.notifyService.showSuccess("", "Modelo editada com sucesso!")
              this.refreshModelosList();
          });
      }
    });
  } 
  
  deleteDialog(modeloId: number): void {
      const dialogRef = this.dialog.open(DeleteModeloComponent, {
        data: {id: modeloId},
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.service.deleteModelos(modeloId).subscribe(response => {
                this.notifyService.showSuccess("", "Modelo removida com sucesso!")
                this.refreshModelosList();
            });
        }
      });
  }
  
  
  createDialog(): void {
      const dialogRef = this.dialog.open(CreateModeloComponent, {
        data: {},
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result) {
            const nome = result;
            
            if (!nome) {
              this.notifyService.showError("", "Por favor, preencha todos os campos.");
              return;
            }
            
            this.service.addModelos(nome).subscribe(response => {
                this.notifyService.showSuccess("", "Modelo cadastrada com sucesso!")
                this.refreshModelosList();
            });
        }
      });
  }
  
  searchModelos(event: any) {
    let searchValue = event.target.value;
    if (searchValue) {
      searchValue = searchValue.toLowerCase();

      this.modelosList = this.modelosList.filter(item => {
        return item.nome.toLowerCase().includes(searchValue);
      });
    } else {
      this.refreshModelosList();
    }
  }

}
