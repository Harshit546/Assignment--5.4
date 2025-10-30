export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  gender: string;
  image: string;
}

export interface AuthResponse extends User {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  accessToken?: string;
  refreshToken?: string;
}
