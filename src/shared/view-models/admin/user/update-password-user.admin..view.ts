import { ObjectID } from "typeorm";

export class UpdatePasswordAdminView {
    id: ObjectID;
    password: string;
}