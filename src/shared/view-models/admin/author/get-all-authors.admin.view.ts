import { ObjectID } from "typeorm";

export class GetAllAuthorsAdminView {
    allAuthors: AuthorGetAllAuthorsAdminViewItem[] = [];
}
export class AuthorGetAllAuthorsAdminViewItem {
    id: ObjectID;
    firstName: string;
    lastName: string;
    fullName: string;
}