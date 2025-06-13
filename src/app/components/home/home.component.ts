import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { NewsComponent } from '../news/news.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTabsModule, NewsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private startX: number = 0;
  private dragging: boolean = false;
  private currentX: number = 0;
  private moved = false;



  // Lista de los cuatro banners. Ajusta las rutas a las tuyas dentro de src/assets/img/
  slides: { id:number, img:string}[] = [
    { id: 0, img: 'assets/img/banner1.png' },
    { id: 1, img: 'assets/img/banner2.png' },
    { id: 2, img: 'assets/img/banner3.png' },
    { id: 3, img: 'assets/img/banner4.png' }
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

  onMouseDown(event: MouseEvent): void {
    this.startX = event.clientX;
    this.dragging = true;
    this.moved = false;
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.dragging) return;

    this.currentX = event.clientX;

    // Si hay movimiento real, marca "moved"
    if (Math.abs(this.currentX - this.startX) > 10) {
      this.moved = true;
    }
  }

  onMouseUp(event: MouseEvent): void {
    if (!this.dragging) return;

    this.dragging = false;

    if (!this.moved) return; 

    const diffX = this.currentX - this.startX;

    if (Math.abs(diffX) > 50) {
      diffX > 0 ? this.next() : this.prev();
    }
  }


}
