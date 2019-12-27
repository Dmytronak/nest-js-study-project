import { ObjectID } from "typeorm";

export class UpdateUserAdminView {
    id: ObjectID;
    creationAt: Date;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    age: number;
    roleId: string;
}