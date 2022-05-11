import { Resolver, Mutation, Arg, Int, Query } from "type-graphql";
import { Sales } from "../entities/Sales";
import { RetailOutlets } from "../entities/RetailOutlets";
import { SalesPeople } from "../entities/SalesPeople";
import { SalesCreateInput, SalesUpdateInput } from "../dto/SalesDTO";
import {
  CreatedEntityOutputDTO,
  DeletedEntityOutputDTO,
  UpdatedEntityOutputDTO,
} from "../dto/GenericDTO";
const connectPostgres = require("../config/database");
const connectionRedis = require("../config/redis");
import {
  salesByRetailOutletYearMonthOutputDTO,
  salesBySalesPersonYearDTO,
} from "../dto/ReportsDTO";

//----------------------------------------------

@Resolver()
export class SalesResolver {
  @Mutation(() => CreatedEntityOutputDTO)
  async createSales(
    @Arg("data", () => SalesCreateInput) data: SalesCreateInput
  ) {
    try {
      const sales = new Sales();
      const retailOutlet = await RetailOutlets.findOne({
        where: {
          id: data.retailOutlet_id,
        },
      });
      if (!retailOutlet) {
        throw new Error(
          `Fail! createSales Retail Outlet  invalid: ${data.retailOutlet_id}`
        );
      }
      const salesPeople = await SalesPeople.findOne({
        where: {
          id: data.salesPeople_id,
        },
      });
      if (!salesPeople) {
        throw new Error(
          `Fail! createSales salesPeoplet invalid: ${data.salesPeople_id}`
        );
      }

      sales.retailOutlet_id = retailOutlet;
      sales.salesPeople_id = salesPeople;
      if (data.details) sales.details = data.details;
      if (data.amount) sales.amount = data.amount;
      const res = (await sales.save()) as Sales;
      const output: CreatedEntityOutputDTO = {
        status: true,
        id: res.id.toString(),
        message: "Sales Created Successfully",
      };
      return output;
    } catch (e) {
      console.log("Fail! - createSales - e:", e);
      throw e;
    }
  }

  //----------------------------------------------

  @Mutation(() => DeletedEntityOutputDTO)
  async deleteSales(@Arg("id", () => Int) id: number) {
    try {
      await Sales.delete(id);
      const output: DeletedEntityOutputDTO = {
        status: true,
        message: "Sales Deleted Successfully",
      };
      return output;
    } catch (e) {
      console.log("Fail! -  deleteSales - e:", e);
      throw e;
    }
  }

  //----------------------------------------------

  @Mutation(() => UpdatedEntityOutputDTO)
  async updateSales(
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => SalesUpdateInput) fields: SalesUpdateInput
  ) {
    try {
      await Sales.update({ id }, fields);
      const output: UpdatedEntityOutputDTO = {
        status: true,
        message: "Sales Updated Successfully",
      };
      return output;
    } catch (e) {
      console.log("Fail! -  updateSales - e:", e);
      throw e;
    }
  }

  //----------------------------------------------

  @Query(() => [Sales])
  Sales() {
    return Sales.find({ relations: ["retailOutlet_id", "salesPeople_id"] });
  }

  //----------------------------------------------

  @Query(() => [salesByRetailOutletYearMonthOutputDTO])
  async salesByRetailOutletYearMonth(@Arg("year") vYearArg: string) {
    let res: salesByRetailOutletYearMonthOutputDTO;
    try {
      const tagRedis = "salesByRetailOutletYearMonthOutputDTO" + vYearArg;
      const clientRedis = await connectionRedis.getInstance();
      const resRedis = await clientRedis.ClientRedis.get(tagRedis);

      // const fecha = new Date() // To check Redis Activity
      if (resRedis) {
        // To check Redis Activity
        // console.log("RO found in Redis - TIME: ", fecha.getHours(),":", fecha.getMinutes());

        res = JSON.parse(resRedis);
      } else {
        // To check Redis Activity
        // console.log("RO NOT found in Redis - TIME: ", fecha.getHours(),":",fecha.getMinutes()); 

        const ps = await connectPostgres.getInstance();
        res = await ps.AppDataSource.createQueryBuilder()
          .select("sales.retailOutlet_id")
          .addSelect("date_part('year', sales.createdAt)", "txn_year")
          .addSelect("date_part('month', sales.createdAt)", "txn_month")
          .addSelect("retailOutlets.name", "name")
          .addSelect("COUNT(*)", "count")
          .addSelect("SUM(sales.amount)", "amount")
          .from(Sales, "sales")
          .leftJoin(
            RetailOutlets,
            "retailOutlets",
            "retailOutlets.id = sales.retailOutlet_id"
          )
          .where("date_part('year', sales.createdAt) = :vYear", {
            vYear: vYearArg,
          })
          .groupBy("sales.retailOutlet_id")
          .addGroupBy("txn_year")
          .addGroupBy("txn_month")
          .addGroupBy("retailOutlets.name")
          .orderBy("sales.retailOutlet_id", "ASC")
          .addOrderBy("txn_year", "ASC")
          .addOrderBy("txn_month", "ASC")
          .getRawMany();
        await clientRedis.ClientRedis.set(tagRedis, JSON.stringify(res), {
          EX: 180,
        });
      }
      return res;
    } catch (e) {
      console.log("Fail! -  salesByRetailOutletYearMonth - e:", e);
      throw e;
    }
  }

  //----------------------------------------------

  @Query(() => [salesBySalesPersonYearDTO])
  async salesBySalesPersonYear(@Arg("year") vYearArg?: string) {
    let res: salesBySalesPersonYearDTO;
    try {
      const tagRedis = "salesBySalesPersonYearDTO" + vYearArg;
      const clientRedis = await connectionRedis.getInstance();
      const resRedis = await clientRedis.ClientRedis.get(tagRedis);
      if (resRedis) {
        res = JSON.parse(resRedis);
      } else {
        const ps = await connectPostgres.getInstance();
        res = await ps.AppDataSource.createQueryBuilder()
          .select("sales.salesPeople_id", "salesPeople_id")
          .addSelect("date_part('year', sales.createdAt)", "txn_year")
          .addSelect("sales_people.name", "name")
          .addSelect("SUM(sales.amount)", "amount")
          .from(Sales, "sales")
          .leftJoin(
            SalesPeople,
            "sales_people",
            "sales_people.id = sales.salesPeople_id"
          )
          .where("date_part('year', sales.createdAt) = :vYear", {
            vYear: vYearArg,
          })
          .groupBy("sales.salesPeople_id")
          .addGroupBy("txn_year")
          .addGroupBy("name")
          .orderBy("amount", "DESC")
          .getRawMany();
        await clientRedis.ClientRedis.set(tagRedis,
          JSON.stringify(res),
          {
            EX: 180,
          }
        );
      }
      return res;
    } catch (e) {
      console.log("Fail! -  salesBySalesPersonYear - e:", e);
      throw e;
    }
  }
}

//----------------------------------------------
