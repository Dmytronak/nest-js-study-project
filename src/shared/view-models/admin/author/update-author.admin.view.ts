import { ObjectID } from "typeorm";

export class UpdateAuthorAdminView {
    id: ObjectID;
    firstName: string;
    lastName: string;
    fullName: string;
}