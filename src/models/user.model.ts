export interface IUser {
    uid: string;
    name: string;
    email: string;
    photoURL: string;
    phoneNumber: number;
    course?: string;
    enabled?: boolean;
}

export class Student implements IUser {
    uid: string = "";
    name: string = "";
    email: string = "";
    photoURL: string = "";
    phoneNumber: number = 0;
    course: string = "";
    className: string = "";
    enabled?: boolean = false;

    constructor({ uid, name, email, photoURL, phoneNumber, course, className} : Student) {
        this.uid = uid;
        this.name = name;
        this.email = email.toLowerCase();
        this.photoURL = photoURL;
        this.phoneNumber = phoneNumber;
        this.course = course;
        this.className = className;
    }

    serialize() {
        return JSON.parse(JSON.stringify(this));
    }

}