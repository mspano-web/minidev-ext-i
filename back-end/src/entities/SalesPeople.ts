import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { RetailOutlets } from "./RetailOutlets";
import { Sales } from "./Sales";

//----------------------------------

@ObjectType()
@Entity()
export class SalesPeople extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: string;

  @Field(() => RetailOutlets, { nullable: true })
  @ManyToOne(
    () => RetailOutlets,
    (retailOutlet: RetailOutlets) => retailOutlet.id
  )
  @JoinColumn({ name: "retailOutlet_id" })
  retailOutlet_id: RetailOutlets;

  @Field(() => [Sales])
  @OneToMany(() => Sales, (sales: Sales) => sales.id)
  @JoinColumn({ name: "sales_id" })
  sales_id: Sales[];
}

//----------------------------------
