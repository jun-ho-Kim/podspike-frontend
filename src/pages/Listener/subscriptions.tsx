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
                <div className='grid grid-cols-2'>
                {data?.subscriptions.subscriptions && data?.subscriptions.subscriptions.map((podcast, indext) => (
                    <Link
                        className='border-gray-400 border-b-2 mr-5 mt-3'  
                        to={`/${podcast.id}`}>
                    <div className="flex  ">
                        <div 
                            className="w-16 h-16 mb-2 bg-red-300 rounded-lg bg-center bg-cover" 
                            style={{backgroundImage: `url(${podcast.thumbnail})`}} />
                        <div className="ml-3   pr-1 border-opacity-30">
                            <h4 className="text-lg font-semibold">
                                {podcast.title}
                            </h4>
                            <div className="text-xs">
                                <span className="opacity-80">{podcast.updateAt.substring(2,10).replace(/-/g, ".")}</span>
                                {/* <p className='text-gray-500 mt-1 ml-2'>구독자 <span className='text-gray-900'>{`${podcast.subscriber.length}`}</span></p> */}

                            </div>
                        </div>
                    </div>
                    </Link>
                ))}
                </div>
            </div>
        </div>
    )
}