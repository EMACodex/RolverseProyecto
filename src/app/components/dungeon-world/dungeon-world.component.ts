import { Component } from '@angular/core';

@Component({
  selector: 'app-dungeon-world',
  standalone: true,
  templateUrl: './dungeon-world.component.html',
  styleUrls: ['./dungeon-world.component.css'],
})
export class DungeonWorldComponent {
  maps: string[] = [
    'assets/img/mundos dungeon/mapa1.jpg',
    'assets/img/mundos dungeon/mapa2.jpg',
    'assets/img/mundos dungeon/mapa3.jpg',
    'assets/img/mundos dungeon/mapa4.jpg',
    'assets/img/mundos dungeon/mapa5.jpg',
    'assets/img/mundos dungeon/mapa6.jpg',
  ];

  selectedMap: string | null = null;

  openModal(src: string) {
    this.selectedMap = src;
  }

  closeModal() {
    this.selectedMap = null;
  }

  getFileName(url: string): string {
    return url.substring(url.lastIndexOf('/') + 1);
  }
}
