import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import { SharedService } from 'src/app/shared.service';
import { SharedFileService } from 'src/app/shared-file.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

export interface DialogData {
  nome: string;
  marca_id: number;
  modelo_id: number;
  valor: number;
}

@Component({
  selector: 'app-create-veiculo',
  templateUrl: './create-veiculo.component.html',
  styleUrls: ['./create-veiculo.component.css'],
  standalone: true,
  imports: [ MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule, CommonModule ]
})
export class CreateVeiculoComponent {
    constructor(
      private sharedService: SharedService,
      private sharedFileService: SharedFileService,
      public dialogRef: MatDialogRef<CreateVeiculoComponent>,
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
        console.log(this.marcas);
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
