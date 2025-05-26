import { AvatarGenerator } from "avatart";
import { hashSync } from "bcrypt";
import { AfterInsert, BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Minio } from "../../utils/minio.utils";
import { Note } from "./notes.model";

const avatart = new AvatarGenerator({ backColor: [0,0,0], gridSize:19, fixedSize:300, symmetry: 'vertical' })
@Entity()
export class User extends BaseEntity
{
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ type: "text", nullable:false })
    name!:string;

    @Column({ type: "text" , unique: true, nullable:false  })
    email!:string;

    @Column({ type: "text", nullable:false })
    password!:string;


    @OneToMany(() => Note, note => note.user)
    notes!: Note[];


    @BeforeInsert()
    encryptPass() {
        const hash = hashSync(this.password, 10);
        this.password = hash
    }

    @AfterInsert()
    async getProfilePic() {
        const profilePic = avatart.getAvatarBuffer();
        await Minio.putObject(Minio.profilePicBucket, `${this.id}.png`, profilePic);
    }
}
