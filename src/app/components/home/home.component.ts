// src/app/home/home.component.ts

import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Lista de los cuatro banners. Ajusta las rutas a las tuyas dentro de src/assets/img/
  slides: { id:number, img:string}[] = [
    { id: 0, img: 'assets/img/banner1.jpg' },
    { id: 1, img: 'assets/img/banner2.jpg' },
    { id: 2, img: 'assets/img/banner3.jpg' },
    { id: 3, img: 'assets/img/banner4.jpg' }
  ];

  // Índice en slides[] del banner que está “al frente” (center)
  currentCenterIndex = 0;

  /**
   * Calcula la clase CSS para cada slide (por su índice `i` en slides[])
   * Dependiendo de su relación con currentCenterIndex devuelve:
   * - 'center'   → es el banner central
   * - 'left'     → es el banner a la izquierda
   * - 'right'    → es el banner a la derecha
   * - 'back'     → es el banner “detrás”
   */
  getPositionClass(i: number): 'center' | 'left' | 'right' | 'back' {
    const total = this.slides.length; // 4
    const center = this.currentCenterIndex;
    const left = (center + total - 1) % total;   // 3 posiciones antes
    const right = (center + 1) % total;          // 1 posición después
    const back = (center + 2) % total;           // 2 posiciones después

    if (i === center) return 'center';
    if (i === left)   return 'left';
    if (i === right)  return 'right';
    if (i === back)   return 'back';

    // Nunca ocurrirá en este caso, porque solo hay 4 slides.
    return 'back';
  }

  /** Avanza el carrusel hacia la derecha */
  next() {
    this.currentCenterIndex = (this.currentCenterIndex + 1) % this.slides.length;
  }

  /** Retrocede el carrusel hacia la izquierda */
  prev() {
    this.currentCenterIndex = (this.currentCenterIndex + this.slides.length - 1) % this.slides.length;
  }
}
