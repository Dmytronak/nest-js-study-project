export class CreateBookAdminView{
    title:string;
    price:number;
    authors:AuthorCreateBookAdminViewItem[] = []
}

export class AuthorCreateBookAdminViewItem {
    authorId:string;
}