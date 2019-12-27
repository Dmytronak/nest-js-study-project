import { ObjectID } from "typeorm";

export class GetAllUsersAdminView {
    allUsers: UserGetAllUsersAdminViewItem[] = [];
}
export class UserGetAllUsersAdminViewItem {
    id: ObjectID;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    age: number;
}