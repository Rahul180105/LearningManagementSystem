export interface User{
    id:number;
    email:string;
    username:string;
    first_name:string;
    last_name:string;
    status:string;
}
export interface Role {
    id:number;
    name:string;
    description:string;
}

export interface Permission {
    id:number;
    name:string;
    description:string;
}