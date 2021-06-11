import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import React from "react";

// export const SUBSCRIPTION_QUERY = gql`
//     query subscriptionQuery {
//         subscriptions {
//             ok
//             error
//             subscriptions {
//                 id
//                 title
//                 category
//                 description
//                 rating
//                 thumbnail
//             }
//         }
//     }
// `;

export const Subscriptions = () => {
    // const {data, loading, error} = useQuery(SUBSCRIPTION_QUERY);
    // console.log("subscription Data", data);
    return (
        <div>
            <span>Subscripctions</span>
        </div>
    )
}