
export class User {
    _id: string;
    FirebaseId: string;
    mail: string;

    constructor(FirebaseId: string, mail: string, _id?: string) {
        this.FirebaseId = FirebaseId;
        this.mail = mail;
        this._id = _id;
    }
}