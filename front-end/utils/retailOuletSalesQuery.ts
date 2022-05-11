import { gql } from '@apollo/client';


const GET_RETAIL_OUTLET_SALES = gql`
query GetRetailOutletSales($year: String!) {
  salesByRetailOutletYearMonth(year: $year)
  {
    retailOutlet_id, 
    txn_year, 
    txn_month,
    name,
    count,
    amount
}
}`;

export default GET_RETAIL_OUTLET_SALES;