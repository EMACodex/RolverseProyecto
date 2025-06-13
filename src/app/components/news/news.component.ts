import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { WordPressPost } from '../../interfaces/new.interface';
import { InternalNews } from '../../interfaces/new.interface';
import { RUTA_API } from '../../../environment';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  posts: (WordPressPost | InternalNews)[] = [];
  loading = true;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAllNews();
  }

  isWordPressPost(post: WordPressPost | InternalNews): post is WordPressPost {
    return (post as WordPressPost).link !== undefined;
  }

  isInternalNews(post: WordPressPost | InternalNews): post is InternalNews {
    return (post as InternalNews).summary !== undefined;
  }

  
  get paginatedPosts(): (WordPressPost | InternalNews)[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.posts.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.posts.length / this.itemsPerPage);
  }

  async fetchAllNews(): Promise<void> {
    try {
      const externalPosts = await firstValueFrom(
        this.http.get<WordPressPost[]>('https://www.elclubdante.es/wp-json/wp/v2/posts?per_page=5&_embed')
      );

      const internalPosts = await firstValueFrom(
        this.http.get<InternalNews[]>(`${RUTA_API}news`)
      );

      this.posts = [...internalPosts, ...externalPosts].sort((a: any, b: any) =>
        new Date(b.created_at || b.date).getTime() - new Date(a.created_at || a.date).getTime()
      );
    } catch (error) {
      console.error('Error cargando noticias:', error);
      this.posts = []; // evitar errores en HTML si todo falla
    } finally {
      this.loading = false;
    }
  }


}



