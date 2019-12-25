import { ObjectID } from "typeorm";

export class GetAllBooksAdminView {
    allBooks:BookGetAllBooksAdminViewItem[] = []; 
}
export class BookGetAllBooksAdminViewItem {
    id:ObjectID;
    title:string;
    price:number;
    authors:AuthorBookGetAllBooksAdminViewItem[] = []
}

export class AuthorBookGetAllBooksAdminViewItem {
    id:ObjectID;
    firstName:string;
    lastName:string;
    fullName:string;
}