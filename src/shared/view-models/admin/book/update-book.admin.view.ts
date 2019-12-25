import { ObjectID } from "typeorm";

export class UpdateBookAdminView {
    id:ObjectID;
    title:string;
    price:number;
    authors:AuthorUpdateBookAdminViewItem[] = []
}

export class AuthorUpdateBookAdminViewItem {
    authorId:string;
}