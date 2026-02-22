export interface User{
    id:number;
    email:string;
    username:string;
    first_name:string;
    last_name:string;
    status:string;
    roles:string[];
}
export interface Role {
    id:number;
    name:string;
    description:string;
    permissions?:Permission[];
}

export interface Permission {
    id:number;
    name:string;
    description:string;
}