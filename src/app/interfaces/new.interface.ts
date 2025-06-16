export interface InternalNews {
  id: number;
  title: string;
  summary: string | null;
  content: string;
  image_path: string | null;
  author_id: number;
  author: string;        
  created_at: string;
}
