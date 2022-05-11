import { InputType, Field } from "type-graphql";
import { BaseEntity } from "typeorm";

//----------------------------------

@InputType()
export class SalesPeopleCreateInput extends BaseEntity {
  @Field()
  name?: string;

  @Field({ nullable: true })
  retailOutlet_id?: number;
}

//----------------------------------

@InputType()
export class SalesPeopleUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;
}

//----------------------------------
