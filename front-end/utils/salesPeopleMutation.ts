import { gql } from '@apollo/client';

export const CREATE_SALESPEOPLE = gql` 
mutation  CreateSalesPeople($name: String!, $retailOutlet_id: Float!) {
  createSalesPeople( data : {name: $name, retailOutlet_id: $retailOutlet_id} ) {
            status,
            id,
            message
        }
}`;


export const DELETE_SALES_PEOPLE = gql`
mutation DeleteSalesPeople( $id: Int!) {
    deleteSalesPeople(id: $id) 
    {
      status,
      message
    }
}`;

export const UPDATE_SALESPEOPLE = gql`
mutation  UpdateSalesPeople( $id: Int!, $name: String!) {
    updateSalesPeople(id: $id, fields : {name: $name}) {
      status,
      message
    }
}`;



