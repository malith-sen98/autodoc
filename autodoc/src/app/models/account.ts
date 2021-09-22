import { Role } from './role';

export class Account {
    id: string;
    //title: string;
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
    jwtToken?: string;
}

export class AccountReg {
    email: string;
    userType: string;
    password: string;
    confirmPassword: string;
    isAccepted: string;
}






// export class Account {
//     id: string;
//     //title: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     role: Role;
//     jwtToken?: string;
// }