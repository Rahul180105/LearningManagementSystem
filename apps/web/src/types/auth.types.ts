export interface LoginResponse{
    accessToken:string;
    refreshToken:string;
}

export interface RegisterRequest{
    email:string;
    username:string;
    password:string;
    first_name:string;
    last_name:string;
    department:string;
}
export interface RegisterResponse{
    message:string;
    user:{
        email:string;
        username:string;
        password:string;
        first_name:string;
        last_name:string;
        department:string;
    }
}

export interface RefreshResponse{
    accessToken:string;
}

export interface MessageResponse{
    message:string;
}

export interface CurrentUser{
    id:number;
    email:string;
    first_name:string;
    last_name:string;
    roles:string[];
}