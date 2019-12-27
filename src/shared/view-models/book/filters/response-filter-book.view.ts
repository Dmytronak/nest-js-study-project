import { ObjectID } from "typeorm";

export class ResponseFilterBookView {
    quantity:number;
    books: BookResponseFilterBookViewItem[] = []
}

export class BookResponseFilterBookViewItem {
    id: ObjectID;
    title: string;
}