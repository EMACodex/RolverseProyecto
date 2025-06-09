export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Response {
  code: number;
  message: string;
  token?: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}
