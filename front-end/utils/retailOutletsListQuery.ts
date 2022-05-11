import { gql } from '@apollo/client';


const GET_RETAIL_OUTLET_LIST = gql`
query 
{
    RetailOutlets {
      id,
      name,
      adress,
      phoneNumber,
      createdAt
    } 
}`;

export default GET_RETAIL_OUTLET_LIST;