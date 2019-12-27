import { BookType } from "src/shared/enums/book-type.enum";

export class CreateBookAdminView {
    title: string;
    price: number;
    type: BookType;
    authors: AuthorCreateBookAdminViewItem[] = []
}

export class AuthorCreateBookAdminViewItem {
    authorId: string;
}