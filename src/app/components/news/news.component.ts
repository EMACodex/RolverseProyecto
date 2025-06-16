import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InternalNews } from '../../interfaces/new.interface';
import { RUTA_API } from '../../../environment';
import { firstValueFrom } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  posts: InternalNews[] = [];
  loading = true;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  isAdmin = false;

  constructor(private http: HttpClient, private router: Router) {}

  private stripTags(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
  }

  ngOnInit(): void {
    this.isAdmin = this.checkIfAdmin();
    this.fetchAllNews();
  }

  private checkIfAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      // decodifica el payload del JWT
      const payload = JSON.parse(atob(token.split('.')[1]));
      // adapta esto al claim que use tu token: 'role', 'roles', 'isAdmin', etc.
      return payload.role === 'admin';
    } catch {
      return false;
    }
  }

  isInternalNews(post: InternalNews): post is InternalNews {
    return (post as InternalNews).summary !== undefined;
  }

  get paginatedPosts(): InternalNews[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.posts.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.posts.length / this.itemsPerPage);
  }

  async fetchAllNews(): Promise<void> {
    try {
      const internalPosts = await firstValueFrom(
        this.http.get<InternalNews[]>(`${RUTA_API}news`)
      );

      // — Aquí asignamos summary dinámico —
      internalPosts.forEach((post) => {
        // 1) Limpiamos HTML de content
        const text = this.stripTags(post.content);
        // 2) Cortamos a 100 chars y añadimos puntos suspensivos si toca
        post.summary = text.length > 100 ? text.slice(0, 100) + '…' : text;
      });

      this.posts = [...internalPosts].sort(
        (a: any, b: any) =>
          new Date(b.created_at || b.date).getTime() -
          new Date(a.created_at || a.date).getTime()
      );
    } catch (error) {
      console.error('Error cargando noticias:', error);
      this.posts = [];
    } finally {
      this.loading = false;
    }
  }

  /** Elimina la noticia con confirmación y actualiza la lista */
  async onDeletePost(id: number) {
    if (!window.confirm('¿Seguro que quieres eliminar esta noticia?')) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      // Construye las cabeceras
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      // Llama al DELETE pasando headers
      await firstValueFrom(
        this.http.delete<{ message: string }>(`${RUTA_API}news/${id}`, {
          headers,
        })
      );
      this.router.navigate(['/']);

      // Quita la noticia del front y reajusta paginación
      this.posts = this.posts.filter(
        (p) => !(this.isInternalNews(p) && p.id === id)
      );
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages || 1;
      }
    } catch (err: any) {
      console.error('Error al eliminar noticia:', err);
      alert(
        err.status === 401
          ? 'No estás autorizado. Inicia sesión como admin.'
          : 'No se pudo eliminar la noticia. Inténtalo de nuevo.'
      );
    }
  }
}
