import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { SalesPeople } from "./SalesPeople";

//----------------------------------

@ObjectType()
@Entity()
export class RetailOutlets extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  adress!: string;

  @Field()
  @Column()
  phoneNumber!: string;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: string;

  @Field(() => [SalesPeople])
  @OneToMany(() => SalesPeople, (salesPeople: SalesPeople) => salesPeople.id)
  @JoinColumn({ name: "salesPeople_id" })
  salesPeople_id: SalesPeople[];
}

//----------------------------------
