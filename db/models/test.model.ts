import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Test extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "text", default: 'content' })
    content!: string;

    @Column({ type: "text", default: 'test' })
    test!: string;
}
