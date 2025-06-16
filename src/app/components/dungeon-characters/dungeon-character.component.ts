import { Component } from '@angular/core';

@Component({
  selector: 'app-dungeon-character',
  standalone: true,
  templateUrl: './dungeon-character.component.html',
  styleUrls: ['./dungeon-character.component.css'],
})
export class DungeonCharacterComponent {
  images: string[] = [
    'assets/img/personajes dungeon/karlach.jpg',
    'assets/img/personajes dungeon/gale.jpg',
    'assets/img/personajes dungeon/shadowheart.jpg',
    'assets/img/personajes dungeon/wyll.jpg',
    'assets/img/personajes dungeon/laezel.jpg',
    'assets/img/personajes dungeon/astarion.jpg',
  ];

  selectedImg: string | null = null;

  openModal(imgSrc: string) {
    this.selectedImg = imgSrc;
  }

  closeModal() {
    this.selectedImg = null;
  }

  /** Extrae el nombre de archivo de la URL */
  getFileName(url: string): string {
    return url.substring(url.lastIndexOf('/') + 1);
  }
}
