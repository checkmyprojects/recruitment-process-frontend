// export interface AppUser{
//     id: number;
//     name: string;
//     username: string;
//     email: string;
//     roles: [];
//     // interviews
//     active: boolean;
// }

export class AppUser{
    constructor(id:number, name:string, username:string, email:string, roles:string[], active:boolean){
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.active = active;
    }
    id: number | undefined;
    name: string | undefined;
    username: string | undefined;
    email: string | undefined;
    roles: string[] | undefined;
    // interviews
    active: boolean | undefined;
}