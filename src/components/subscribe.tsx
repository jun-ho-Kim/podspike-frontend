import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GETPODCAST_QUERY } from "../pages/home";
import { SUBSCRIPTION_QUERY } from "../pages/Listener/subscriptions";
import { subscribeMutation, subscribeMutationVariables } from "../__generated__/subscribeMutation";
import { useMe } from "./hooks/useMe";

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
    const {data: me} = useMe()
    const [ToggleSubscribe, setToggleSubscribe] = useState(false);
    const onCompleted = (data: subscribeMutation) => {
        console.log("subscribe Data", data);

    }
    const [subscribeMutation, {data, loading, error}] = useMutation<subscribeMutation, subscribeMutationVariables>(SUBSCRIBE_MUTATION, {
        onCompleted,
        variables: {
            input: {
                podcastId: +id
            }
        },
    });

    const handleOnClick = () => {
        subscribeMutation();
        setToggleSubscribe(!ToggleSubscribe);
    }
    
    useEffect(() => {
        <>
        {me?.me.subscriptions && me.me.subscriptions.some((sub) => sub.id === +id) && (
            setToggleSubscribe(true)
        )}
        </>
    },[])

    return (
        <div>
            <button 
                className={`${ToggleSubscribe? "bg-gray-500 " : "bg-blue-500"} px-6 py-2 rounded-3xl text-white mt-2`}
                onClick={handleOnClick}
            >{ToggleSubscribe?  "구독 중" : " + 구독"}</button>
        </div>
    )
}