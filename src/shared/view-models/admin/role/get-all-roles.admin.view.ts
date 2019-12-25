import { ObjectID } from "typeorm";

export class GetAllRolesAdminView {
    allRoles:RoleGetAllRolesAdminViewItem[] = []; 
}
export class RoleGetAllRolesAdminViewItem {
    id:ObjectID;
    name:string;
}