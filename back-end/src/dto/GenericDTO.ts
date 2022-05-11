import { Field, ObjectType } from "type-graphql";

// -------------------------------

@ObjectType()
export class CreatedEntityOutputDTO {
  @Field(() => Boolean, { nullable: true })
  status: boolean;

  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  message: string;
}

// -------------------------------

@ObjectType()
export class DeletedEntityOutputDTO {
  @Field(() => Boolean, { nullable: true })
  status: boolean;

  @Field(() => String, { nullable: true })
  message: string;
}

// -------------------------------

@ObjectType()
export class UpdatedEntityOutputDTO {
  @Field(() => Boolean, { nullable: true })
  status: boolean;

  @Field(() => String, { nullable: true })
  message: string;
}

// -------------------------------
