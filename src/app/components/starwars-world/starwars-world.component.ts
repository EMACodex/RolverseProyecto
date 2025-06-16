import { Component } from '@angular/core';

@Component({
  selector: 'app-starwars-world',
  standalone: true,
  templateUrl: './starwars-world.component.html',
  styleUrls: ['./starwars-world.component.css'],
})
export class StarwarsWorldComponent {
  worlds: string[] = [
    'assets/img/mundos star wars/mapa1.jpg',
    'assets/img/mundos star wars/mapa2.jpg',
    'assets/img/mundos star wars/mapa3.jpg',
    'assets/img/mundos star wars/mapa4.jpg',
    'assets/img/mundos star wars/mapa5.jpg',
    'assets/img/mundos star wars/mapa6.jpg',
  ];

  selectedWorld: string | null = null;

  openModal(src: string) {
    this.selectedWorld = src;
  }

  closeModal() {
    this.selectedWorld = null;
  }

  getFileName(url: string): string {
    return url.substring(url.lastIndexOf('/') + 1);
  }
}
