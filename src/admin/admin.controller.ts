import { Controller, Post, Body, SetMetadata, UseGuards, Get } from '@nestjs/common';
import { CreateRoleAdminView } from 'src/shared/view-models/admin/create-role.view';
import { AdminService } from 'src/shared/services/admin/admin.service';
import { UpdateUserAdminView } from 'src/shared/view-models/admin/update-user.view';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/shared/guards/role-based.guard';

@UseGuards(AuthGuard('jwt'),RolesGuard)

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {        
    }
    @SetMetadata('roles', ['admin'])
    @Get('/getRoles')
    async getAllRoles() : Promise<CreateRoleAdminView[]> {
        return await this.adminService.getAllRoles();
    }
    
    @Post('/createRole')
    async createRole(@Body() createRoleAdminView:CreateRoleAdminView) : Promise<void> {
        await this.adminService.createRole(createRoleAdminView);
    }

    @Post('/updateUser')
    async updateUser(@Body() updateUserAdminView:UpdateUserAdminView) : Promise<void> {
        await this.adminService.updateUser(updateUserAdminView);
    }
}
