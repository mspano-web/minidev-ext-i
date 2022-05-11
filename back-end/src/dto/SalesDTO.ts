import { InputType, Field, Float } from "type-graphql";
import { BaseEntity } from "typeorm";

//----------------------------------

@InputType()
export class SalesCreateInput extends BaseEntity {
  @Field()
  details?: string;

  @Field(() => Float)
  amount?: number;

  @Field({ nullable: true })
  retailOutlet_id?: number;

  @Field({ nullable: true })
  salesPeople_id?: number;
}

//----------------------------------

@InputType()
export class SalesUpdateInput {
  @Field(() => String, { nullable: true })
  details?: string;

  @Field(() => Float)
  amount!: number;
}

//----------------------------------
