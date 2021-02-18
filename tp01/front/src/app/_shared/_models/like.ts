export class Like {
    _id: string;
    PostId: string;
    FirebaseId: string;

    constructor(PostId: string, FirebaseId: string, _id?: string) {
        this.PostId = PostId;
        this.FirebaseId = FirebaseId;
        this._id = _id;
    }
}