export interface personalUser {
  name:string;
  email:string;
  message_count:number;
}

export interface personalUserResponse {
  data: personalUser;
  message: string;
}
