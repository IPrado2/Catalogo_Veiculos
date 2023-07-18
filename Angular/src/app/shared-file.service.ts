import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedFileService {
  selectedFile: File | null = null;

  constructor() {}

  setSelectedFile(file: File) {
    this.selectedFile = file;
  }

  getSelectedFile(): File | null {
    return this.selectedFile;
  }

  clearSelectedFile() {
    this.selectedFile = null;
  }
}
