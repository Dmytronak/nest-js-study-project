import { ObjectID } from "typeorm";

export class GetAllUsersAuthView {
    allUsers:UserGetAllUsersAuthViewItem[] = []; 
}
export class UserGetAllUsersAuthViewItem {
    email: string;
}