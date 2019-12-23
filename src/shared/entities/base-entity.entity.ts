import { Entity, Column, ObjectIdColumn, ObjectID, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseEntity {
    
    @PrimaryGeneratedColumn()
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    craationAt: Date;

    constructor() {
        this.craationAt = new Date();    
    }
}
