
export class Student {

    constructor({ uid, name, email, photoURL, phoneNumber, course, className}) {
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