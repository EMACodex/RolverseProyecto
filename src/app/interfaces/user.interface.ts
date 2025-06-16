export interface personalUser {
  name:string;
  email:string;
  message_count:number;
  points:number;
  rank_name:string;
  rank_image: string;
  creation_date:Date;

}

export interface personalUserResponse {
  data: personalUser;
  message: string;
}
