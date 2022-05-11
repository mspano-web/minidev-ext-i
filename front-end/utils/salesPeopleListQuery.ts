import { gql } from "@apollo/client";


const GET_SALESPEOPLE_LIST = gql`
query {
    salesPeople {
        id,
        name,
        createdAt,
        retailOutlet_id {
          id,
          name
        }    
      } 
}`;

export default GET_SALESPEOPLE_LIST;



