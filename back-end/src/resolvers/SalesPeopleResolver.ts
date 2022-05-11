import { Resolver, Mutation, Arg, Int, Query } from "type-graphql";
import { SalesPeople } from "../entities/SalesPeople";
import { RetailOutlets } from "../entities/RetailOutlets";
import {
  SalesPeopleCreateInput,
  SalesPeopleUpdateInput,
} from "../dto/SalesPeopleDTO";
import {
  CreatedEntityOutputDTO,
  DeletedEntityOutputDTO,
  UpdatedEntityOutputDTO,
} from "../dto/GenericDTO";

//-------------------------------------

@Resolver()
export class SalesPeopleResolver {
  @Mutation(() => CreatedEntityOutputDTO)
  async createSalesPeople(
    @Arg("data", () => SalesPeopleCreateInput) data: SalesPeopleCreateInput
  ) {
    try {
      const salesPeople = new SalesPeople();
      const retailOutlet = await RetailOutlets.findOne({
        where: {
          id: data.retailOutlet_id,
        },
      });
      if (!retailOutlet) {
        throw new Error(`Fail! createSales Retail Outlet  invalid: ${data.retailOutlet_id}`);
      }
      salesPeople.retailOutlet_id = retailOutlet;
      salesPeople.name = data.name || "Sin definir";
      const res = (await salesPeople.save()) as SalesPeople;
      const output: CreatedEntityOutputDTO = {
        status: true,
        id: res.id.toString(),
        message: "SalesPeople Created Successfully",
      };
      return output;
    } catch (e) {
      console.log("Fail! - createSalesPeople - e:", e);
      throw e;
    }
  }

  //----------------------------------------------

//------------------------------------------------------------------------------
// Validation can be added: that no sales have been made for this Salesperson.
//-----------------------------------------------------------------------------

  @Mutation(() => DeletedEntityOutputDTO)
  async deleteSalesPeople(@Arg("id", () => Int) id: number) {
    try {
      await SalesPeople.delete(id);
      const output: DeletedEntityOutputDTO = {
        status: true,
        message: "SalesPeople Deleted Successfully",
      };
      return output;
    } catch (e) {
      console.log("Fail! - deleteSalesPeople - e:", e);
      throw e;
    }
  }

  //----------------------------------------------

  @Mutation(() => UpdatedEntityOutputDTO)
  async updateSalesPeople(
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => SalesPeopleUpdateInput) fields: SalesPeopleUpdateInput
  ) {
    try {
      await SalesPeople.update({ id }, fields);
      const output: UpdatedEntityOutputDTO = {
        status: true,
        message: "SalesPeople Updated Successfully",
      };
      return output;
    } catch (e) {
      console.log("Fail! - updateSalesPeople - e:", e);
      throw e;
    }
  }

  //----------------------------------------------

  @Query(() => [SalesPeople])
  salesPeople() {
    return SalesPeople.find({ relations: ["retailOutlet_id"] });
  }
}
