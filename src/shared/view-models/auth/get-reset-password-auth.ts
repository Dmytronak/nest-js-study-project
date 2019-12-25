import { ObjectID } from "typeorm";

export class GetResetPasswordAuthView{
    id:ObjectID;
    email: string;
    fullName: string;
}