import { Component } from '@angular/core';

@Component({
  selector: 'app-starwars-character',
  standalone: true,
  templateUrl: './starwars-character.component.html',
  styleUrls: ['./starwars-character.component.css'],
})
export class StarwarsCharacterComponent {
  images: string[] = [
    'assets/img/personajes star wars/pers1.jpg',
    'assets/img/personajes star wars/pers2.jpg',
    'assets/img/personajes star wars/pers3.jpg',
    'assets/img/personajes star wars/pers4.jpg',
    'assets/img/personajes star wars/pers5.jpg',
    'assets/img/personajes star wars/pers6.jpg',
  ];

  selectedImg: string | null = null;

  openModal(img: string) {
    this.selectedImg = img;
  }

  closeModal() {
    this.selectedImg = null;
  }

  getFileName(url: string): string {
    return url.substring(url.lastIndexOf('/') + 1);
  }
}
