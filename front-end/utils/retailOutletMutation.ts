import { gql } from '@apollo/client';

export const CREATE_RETAIL_OUTLET = gql`
mutation  CreateRetailOutlets(
    $name: String!, 
    $address: String!, 
    $phoneNumber: String!) {
    createRetailOutlets(data :  {name: $name, adress: $address, phoneNumber: $phoneNumber}) {
      status,
      id,
      message
    }
}`;


export const DELETE_RETAIL_OUTLET = gql`
mutation DeleteRetailOutlets( $id: Int!) {
    deleteRetailOutlets(id: $id) 
    {
      status,
      message
    }
}`;


export const UPDATE_RETAIL_OUTLET = gql`
mutation  UpdateRetailOutlets(
    $id: Int!,
    $name: String!, 
    $address: String!, 
    $phoneNumber: String!) {
    updateRetailOutlets(id: $id, fields :  {name: $name, adress: $address, phoneNumber: $phoneNumber}) {
      status,
      message
    }
}`;

