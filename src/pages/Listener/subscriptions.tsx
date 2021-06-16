import { gql, useQuery } from "@apollo/client";
import { url } from "inspector";
import React from "react";
import { Link } from "react-router-dom";
import { subscriptionQuery } from "../../__generated__/subscriptionQuery";

export const SUBSCRIPTION_QUERY = gql`
    query subscriptionQuery {
        subscriptions {
            ok
            error
            subscriptions {
                id
                title
                thumbnail
                category
                updateAt
            }
            subscriptionCount
        }
    }
`;

export const Subscriptions = () => {
    const {data, loading, error} = useQuery<subscriptionQuery>(SUBSCRIPTION_QUERY);
    console.log('subscription data', data?.subscriptions);
    return (
        <div className='min-w-min h-screen flex flex-col items-center'>
            <h3 className='text-lg font-bold mt-8'>구독함</h3>
            <h5 className='flex mt-2'> 
                {<p className='text-blue-400 font-semibold'>
                    {data?.subscriptions.subscriptionCount 
                    && data?.subscriptions.subscriptionCount > 0 
                    ? data?.subscriptions.subscriptionCount 
                    : 0 }
                </p>}
                개의 채널
            </h5>
            <div className="sm:w-2/5 mt-14 flex justify-between">
                {data?.subscriptions.subscriptions && data?.subscriptions.subscriptions.map((podcast, indext) => (
                    <Link  to={`/${podcast.id}`}>
                    <div className="flex mr-10">
                        <div 
                            className="w-16 h-16 bg-red-300 rounded-lg bg-center bg-cover" 
                            style={{backgroundImage: `url(${podcast.thumbnail})`}} />
                        <div className="ml-3 border-gray-400 border-b-2  pr-36 border-opacity-30">
                            <h4 className="text-lg font-semibold">
                                {podcast.title}
                            </h4>
                            <span className="text-xs opacity-80">{podcast.updateAt.substring(2,10).replace(/-/g, ".")}</span>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}