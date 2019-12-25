import { ObjectID } from "typeorm";

export class ResetPasswordAuthView{
    id:ObjectID;
    password:string;
}