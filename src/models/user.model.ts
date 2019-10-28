export interface IUser {
    uid: string;
    name: string;
    email: string;
    photoURL: string;
    phoneNumber: number;
    stream: string;
}

export class User implements IUser {
    uid: string = "";
    name: string = "";
    email: string = "";
    photoURL: string = "";
    phoneNumber: number = 0;
    stream: string = "";

    constructor() {

    }

}