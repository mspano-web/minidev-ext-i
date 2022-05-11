import { Resolver, Mutation, Arg, Int, Query } from "type-graphql";
import { RetailOutlets } from "../entities/RetailOutlets";
import {
  RetailOutletsCreateInput,
  RetailOutletsUpdateInput,
} from "../dto/RetailOutletsDTO";
import {
  CreatedEntityOutputDTO,
  DeletedEntityOutputDTO,
  UpdatedEntityOutputDTO,
} from "../dto/GenericDTO";

//----------------------------------------------

@Resolver()
export class RetailOutletsResolver {
  @Mutation(() => CreatedEntityOutputDTO)
  async createRetailOutlets(
    @Arg("data", () => RetailOutletsCreateInput) data: RetailOutletsCreateInput
  ) {
    try {
      const newRetailOutlets = RetailOutlets.create(data);
      const res = (await newRetailOutlets.save()) as RetailOutlets;
      const output: CreatedEntityOutputDTO = {
        status: true,
        id: res.id.toString(),
        message: "Retail Point of Sale Created Successfully",
      };
      return output;
    } catch (e) {
      console.log("Fail! - createRetailOutlets - e:", e);
      throw e;
    }
  }

  //----------------------------------------------

  //------------------------------------------------------------------------------
// Validation can be added: that no sales have been made for this Point of Sale.
//-----------------------------------------------------------------------------

  @Mutation(() => DeletedEntityOutputDTO)
  async deleteRetailOutlets(@Arg("id", () => Int) id: number) {
    await RetailOutlets.delete(id);
    try {
      const output: DeletedEntityOutputDTO = {
        status: true,
        message: "Retail Point of Sale Deleted Successfully",
      };
      return output;
    } catch (e) {
      console.log("Fail! - deleteRetailOutlets - e:", e);
      throw e;
    }
  }

  //----------------------------------------------

  @Mutation(() => UpdatedEntityOutputDTO)
  async updateRetailOutlets(
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => RetailOutletsUpdateInput)
    fields: RetailOutletsUpdateInput
  ) {
    try {
      await RetailOutlets.update({ id }, fields);
      const output: UpdatedEntityOutputDTO = {
        status: true,
        message: "Retail Point of Sale Updated Successfully",
      };
      return output;
    } catch (e) {
      console.log("Fail! - updateRetailOutlets - e:", e);
      throw e;
    }
  }

  //----------------------------------------------

  @Query(() => [RetailOutlets])
  RetailOutlets() {
    return RetailOutlets.find();
  }
}
