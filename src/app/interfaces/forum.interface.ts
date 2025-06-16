

export interface ForumInterface {
  id?: number;
  title: string;
  description: string;
}

export interface getForumsResponse {
  message: string;
  data?: ForumInterface[];
}

export interface getForumResponse {
  message: string;
  data?: ForumInterface;
}

export interface deleteForumResponse {
  message: string;
  data: ForumInterface;
}
