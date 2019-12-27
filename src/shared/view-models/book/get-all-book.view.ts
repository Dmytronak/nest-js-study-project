import { ObjectID } from "typeorm";
import { BookType } from "src/shared/enums/book-type.enum";

export class GetFilteredBookView {
    collectionSize: number;
    books: BookGetFilteredBookViewItem[] = [];
}
export class BookGetFilteredBookViewItem {
    id: ObjectID;
    title: string;
    type: BookType;
    price: number;
    authors: AuthorBookGetFilteredBookViewItem[] = [];
}
export class AuthorBookGetFilteredBookViewItem {
    id: ObjectID;
    fullName: string;
}