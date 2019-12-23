import { Injectable, Inject} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from 'src/shared/entities/admin/auth-roles.entity'
import { CreateRoleAdminView } from 'src/shared/view-models/admin/create-role.view';
import { UpdateUserAdminView } from 'src/shared/view-models/admin/update-user.view';
import { User } from 'src/shared/entities/user.entity';

@Injectable()
export class AdminService {
    constructor(@Inject('ROLES_REPOSITORY') private readonly rolesRepository: Repository<Role>,
    @Inject('USER_REPOSITORY') private readonly userRepository: Repository<User>) {

    }
    async getAllRoles():Promise<CreateRoleAdminView[]> {
        const response:CreateRoleAdminView[] = await this.rolesRepository.find();
        return response;
    }

    async createRole(createRoleAdminView:CreateRoleAdminView):Promise<void> {
        const role:Role = new Role();
        role.name = createRoleAdminView.name;
        await this.rolesRepository.save(role);
    }

    async updateUser(updateUserAdminView:UpdateUserAdminView):Promise<void> {
        const user:User = await this.userRepository.findOne(updateUserAdminView.id);
        
        user.email = updateUserAdminView.email;
        user.age = updateUserAdminView.age;
        user.firstName = updateUserAdminView.firstName;
        user.lastName = updateUserAdminView.lastName;
        user.fullName = `${updateUserAdminView.firstName} ${updateUserAdminView.lastName}`;

        if(updateUserAdminView.roleId){
            const role:Role = await this.rolesRepository.findOne(updateUserAdminView.roleId);
            user.roles = [role];
        }

        await this.userRepository.update(user._id,user)
    }
}