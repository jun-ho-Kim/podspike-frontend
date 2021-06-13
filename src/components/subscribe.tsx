import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { subscribeMutation, subscribeMutationVariables } from "../__generated__/subscribeMutation";

export const SUBSCRIBE_MUTATION = gql`
    mutation subscribeMutation($input: SubscribeInput!) {
        subscribe(input: $input) {
            ok
            error
        }
    }
`;

interface IParam {
    id: string;
}

export const Subscribe = () => {
    const {id} = useParams<IParam>();
    const [ToggleSubscribe, setToggleSubscribe] = useState(false);

    const [subscribeMutation, {data, loading, error}] = useMutation<subscribeMutation, subscribeMutationVariables>(SUBSCRIBE_MUTATION, {
        variables: {
            input: {
                podcastId: +id
            }
        }
    });
    console.log("subscribe Data", data);

    const handleOnClick = () => {
        subscribeMutation();
        setToggleSubscribe(!ToggleSubscribe);
    }
    
    useEffect(() => {
        
    })

    return (
        <div>
            <button 
                className="bg-blue-500 px-6 py-2 rounded-3xl text-white mt-2"
                onClick={handleOnClick}
            >{ToggleSubscribe? "+ 구독" : "구독 중"}</button>
        </div>
    )
}