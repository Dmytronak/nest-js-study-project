import { ObjectID } from "typeorm";
import { BookType } from "src/shared/enums/book-type.enum";

export class GetAllBooksAdminView {
    allBooks: BookGetAllBooksAdminViewItem[] = [];
}
export class BookGetAllBooksAdminViewItem {
    id: ObjectID;
    title: string;
    type: BookType;
    price: number;
    authors: AuthorBookGetAllBooksAdminViewItem[] = []
}

export class AuthorBookGetAllBooksAdminViewItem {
    id: ObjectID;
    firstName: string;
    lastName: string;
    fullName: string;
}