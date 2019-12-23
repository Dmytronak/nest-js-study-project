import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base-entity.entity';
import { Role } from 'src/shared/entities/admin/auth-roles.entity';

@Entity()
export class User extends BaseEntity {
    @Column()
    email: string;

    @Column()
    salt: string;

    @Column()
    hash: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    fullName: string;

    @Column()
    age: number;

    @Column(type => Role)
    roles:Role[]
}
