import { ObjectID } from "typeorm";
import { BookType } from "src/shared/enums/book-type.enum";

export class UpdateBookAdminView {
    id: ObjectID;
    title: string;
    type: BookType;
    price: number;
    authors: AuthorUpdateBookAdminViewItem[] = []
}

export class AuthorUpdateBookAdminViewItem {
    authorId: string;
}