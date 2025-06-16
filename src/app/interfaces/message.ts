export interface MessageInterface {
  id: number;
  user_name: string;
  forum_id: number;
  text: string;
  image_path?: string;
  creation_date: Date;
}

export interface GetMessagesResponse {
  message: string;
  data: MessageInterface[];
}

export interface GetMessageResponse {
  message: string;
  data: MessageInterface;
}
