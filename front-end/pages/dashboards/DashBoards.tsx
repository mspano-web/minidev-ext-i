import styles from "../../styles/dashboard.module.scss";
import Layout from "../../components/Layout";
import TableRetailOutletsSales from "../../components/TableRetailOutletsSales";
import TableSalesPersonsSales from "../../components/TableSalesPersonsSales";
import GraphRetailOutletsSales from "../../components/GraphRetailOutletsSales";
import GraphSalespersonsSales from "../../components/GraphSalespersonsSales";
import GET_SALESPERSON_SALES from "../../utils/salesPersonSalesQuery";
import GET_RETAIL_OUTLET_SALES from "../../utils/retailOuletSalesQuery";
import apolloClient from "../../utils/apollo-client";

import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Only use in pages -/- NOT in components

  // You can then replace year with the year entered by the user
  const yearCurrent = new Date().getFullYear().toString();

  const resRetailOutetSales = apolloClient.query({
    query: GET_RETAIL_OUTLET_SALES,
    variables: { year: yearCurrent },
  });

  const resSalespersonSales = apolloClient.query({
    query: GET_SALESPERSON_SALES,
    variables: { year: yearCurrent },
  });

  const responses = await Promise.all([
    resRetailOutetSales,
    resSalespersonSales,
  ]);

  return {
    props: {
      salesByRetailOutletYearMonth: responses[0].data,
      salesBySalesPersonYear: responses[1].data,
    },
  };
};

const DashBoards = ({
  salesByRetailOutletYearMonth,
  salesBySalesPersonYear,
}: any) => {

  return (
    <Layout>
      <div className={styles.dashboard}>
        <GraphRetailOutletsSales data={salesByRetailOutletYearMonth} />
        <GraphSalespersonsSales data={salesBySalesPersonYear} />
        <TableRetailOutletsSales data={salesByRetailOutletYearMonth} />
        <TableSalesPersonsSales data={salesBySalesPersonYear} />
      </div>
    </Layout>
  );
};

export default DashBoards;
