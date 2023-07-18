import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { SharedService } from 'src/app/shared.service'
import { SharedFileService } from 'src/app/shared-file.service'
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';


export interface DialogData {
  id: number;
  nome: string;
  marca_id: number;
  modelo_id: number;
  f_name: string;
  valor: number | string;
}

@Component({
  selector: 'app-update-veiculo',
  templateUrl: './update-veiculo.component.html',
  styleUrls: ['./update-veiculo.component.css'],
  standalone: true,
  imports: [ MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule, CommonModule ]
})
export class UpdateVeiculoComponent {
  
  constructor(
    private sharedService: SharedService,
    private sharedFileService: SharedFileService,
    public dialogRef: MatDialogRef<UpdateVeiculoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  marcas: any[] = [];
  modelos: any[] = [];

  ngOnInit(): void {
    this.sharedService.getMarcaList().subscribe(response => {
      this.marcas = response;
    });

    this.sharedService.getModelosList().subscribe(response => {
      this.modelos = response;
    });
  }
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.sharedFileService.setSelectedFile(file);
  }

}
