import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';

export interface DialogData {
  nome: string;
}

@Component({
  selector: 'app-create-modelo',
  templateUrl: './create-modelo.component.html',
  styleUrls: ['./create-modelo.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule]
})
export class CreateModeloComponent {
  constructor(
      public dialogRef: MatDialogRef<CreateModeloComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
}
