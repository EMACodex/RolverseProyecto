import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Person } from '../../interfaces/about.interface';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  people: Person[] = [
    {
      name: 'Erik Bolsón',
      img: 'assets/img/erik.png',
      desc: 'Melómano impenitente de noche y programador de día, se sumerge entre acordes y algoritmos con la misma pasión. Devorador de redbulls y líneas de código, su verdadero hogar está en la mesa de juego: un amateur en juegos de tablero y estratega en vivo, siempre al acecho de nuevas partidas épicas. Cuando no está afinando un script, planea la próxima campaña o sintoniza su playlist favorita para inspirarse. En Rolverse lo encontrarás orquestando aventuras, así como componiendo melodías, listo para convertir cada partida en una experiencia inolvidable.',
    },
    {
      name: 'Pablo Escudo de Roble',
      img: 'assets/img/pablo.png',
      desc: 'Músico de corazón, programador de profesión y rolero como estilo de vida, vive entre partituras clásicas, riffs de banda y juegos de mesa de todo tipo. En Rolverse, compagina su talento tras el teclado con su pasión por los juegos de mesa. Ya sea dirigiendo una sinfonía o liderando una partida, aporta creatividad y disciplina en cada nota y en cada jugada. Siempre dispuesto a compartir una buena melodía o una épica sesión de tablero, es el aliado perfecto para cualquier aventura.',
    },
  ];
}
