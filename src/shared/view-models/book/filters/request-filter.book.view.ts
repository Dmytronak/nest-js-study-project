import { BookType } from "src/shared/enums/book-type.enum";

export class RequestFilterBookView {
    searchString: string;
    priceMin: number;
    priceMax: number;
    type: BookType;
}