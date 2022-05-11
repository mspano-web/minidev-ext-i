import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Field, Int, ObjectType, Float } from "type-graphql";
import { RetailOutlets } from "./RetailOutlets";
import { SalesPeople } from "./SalesPeople";

//----------------------------------

@ObjectType()
@Entity()
export class Sales extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  details!: string;

  @Field(() => Float)
  @Column("decimal", { precision: 10, scale: 2, default: 0.0 })
  amount!: number;

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

  @Field(() => SalesPeople, { nullable: true })
  @ManyToOne(() => SalesPeople, (salesPeople: SalesPeople) => salesPeople.id)
  @JoinColumn({ name: "salesPeople_id" })
  salesPeople_id: SalesPeople;
}

//----------------------------------
