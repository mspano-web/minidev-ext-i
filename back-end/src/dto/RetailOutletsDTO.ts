import { InputType, Field } from "type-graphql";
import { BaseEntity } from "typeorm";

// -------------------------------

@InputType()
export class RetailOutletsCreateInput extends BaseEntity {
  @Field()
  name!: string;

  @Field()
  adress!: string;

  @Field()
  phoneNumber!: string;
}

// -------------------------------

@InputType()
export class RetailOutletsUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  adress!: string;

  @Field(() => String, { nullable: true })
  phoneNumber!: string;
}

// -------------------------------
