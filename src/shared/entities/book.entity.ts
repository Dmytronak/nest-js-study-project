import { BaseEntity } from "src/shared/entities/base-entity.entity";
import { Column, Entity } from "typeorm";
import { Author } from "src/shared/entities/author.entity";

@Entity()
export class Book extends BaseEntity{
    @Column()
    title:string;

    @Column()
    price: number;

    @Column(type=>Author)
    authors:Author[]
    
}