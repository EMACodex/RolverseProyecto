export interface WordPressPost {
  id: number;
  date: string;
  link: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded?: {
    author?: {
      name: string;
    }[];
    ['wp:featuredmedia']?: {
      source_url: string;
    }[];
  };
}


export interface InternalNews {
  id: number;
  title: string;
  summary: string;
  content: string;
  image_path: string | null;
  author_id: number;
  created_at: string;
}
