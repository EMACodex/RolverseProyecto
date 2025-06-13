export interface ForumInterface {
  title: string;
  description: string;
}

export interface ForumResponse {
  message: string;
  data?: ForumInterface[];
}
