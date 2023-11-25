export interface AuthResponse {
    $id: string;
    token: string;
    refreshToken: string;
  }
  
  interface Auth {
    isLoggedIn: boolean;
    token: string;
    refreshToken: string;
  }
  
  export interface AuthData {
    data: {
      auth: Auth;
    };
  }