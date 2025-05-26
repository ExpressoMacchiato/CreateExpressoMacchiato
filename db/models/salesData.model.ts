import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import { SwaggerMetadata } from "../../_super_express/DbConnector";

@Entity()
class SalesData extends BaseEntity
{
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ type: "text" })
    product!:string;

    // @SwaggerMetadata({ required:false })
    @Column({ type: "date", nullable:true })
    sales_date!:Date;

    // @SwaggerMetadata({ hide:true })
    @Column({ type: "int", nullable:true })
    units_sold!:number;

    @Column({ type: "float" })
    price!:number;

}

export { SalesData };
