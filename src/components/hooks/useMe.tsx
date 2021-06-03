import React from 'react'
import { gql, useQuery } from "@apollo/client";
import { meQuery } from '../../__generated__/meQuery';

export const MEQUERY = gql`
    query meQuery {
        me {
            id
            email
            role 
        }
    }
`;

export const useMe = () => {
    return useQuery<meQuery>(MEQUERY);
}