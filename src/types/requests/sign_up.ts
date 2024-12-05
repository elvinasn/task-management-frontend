export interface SignUpRequest {
  email: string;
  full_name: string;
  password: string;
  password_repeat: string;
}

export interface SignUpResponse {
  access_token: string;
}
