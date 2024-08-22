export interface SignupI {
    // username: string;
    email: string;
    password: string;
    cnfPassword: string;
  }
  
  export interface SigninI {
    email: string;
    password: string;
  }
  

 export interface RoleObjI {
    role_id: number;
    role_name: string;
}

// Interface for authentication state
export interface AuthStateI {
    isAuthenticated: boolean;
    role_name: string | null;
    isLoading: boolean;
    error: any;
    access_token: string | null;
}
