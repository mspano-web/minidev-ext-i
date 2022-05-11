import { Field, Float, ObjectType } from "type-graphql";

// -------------------------------

@ObjectType()
export class salesByRetailOutletYearMonthOutputDTO {
  @Field(() => String)
  retailOutlet_id: string;

  @Field(() => String)
  txn_year!: string;

  @Field(() => String)
  txn_month!: string;

  @Field(() => String)
  name!: string;

  @Field(() => Number)
  count!: number;

  @Field(() => Float)
  amount!: number;
}

// -------------------------------

@ObjectType()
export class salesBySalesPersonYearDTO {
  @Field(() => String)
  salesPeople_id: string;

  @Field(() => String)
  txn_year!: string;

  @Field(() => String)
  name!: string;

  @Field(() => Float)
  amount!: number;
}

// -------------------------------
