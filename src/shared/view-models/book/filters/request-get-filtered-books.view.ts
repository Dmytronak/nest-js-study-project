import { ObjectID } from "typeorm";

export class FilteredBooksRequestView {
    page: number;
    bookIds: BookFilteredBooksRequestView[] = []
}
export class BookFilteredBooksRequestView {
    id: ObjectID;
}