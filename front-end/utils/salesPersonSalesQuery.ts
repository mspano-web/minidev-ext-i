import { gql } from "@apollo/client";

const GET_SALESPERSON_SALES = gql`
query GetSalesPerson($year: String!) {
        salesBySalesPersonYear(year: $year)
        {
            salesPeople_id, 
            txn_year, 
            name
            amount
        }
}`;

export default GET_SALESPERSON_SALES;
