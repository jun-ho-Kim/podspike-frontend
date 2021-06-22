import { gql, useQuery } from "@apollo/client";
import React from 'react';
import { Link } from "react-router-dom";
import { popularPodcasts_Query } from "../../__generated__/popularPodcasts_Query";


export const POPULARPODCASTS_QUERY = gql`
    query popularPodcasts_Query {
        popularPodcasts {
            ok
            error
            popularPodcasts {
                id
                title
                description
                thumbnail
                updateAt
                subscriber {
                    id
                }
            }
        }
    }
`;

export const PopularPodcasts = () => {
    const {data, loading, error} = useQuery<popularPodcasts_Query>(POPULARPODCASTS_QUERY);
    console.log("popularPadcasts data", data);
    return (
        <div className='flex flex-col justify-center items-center'> 
            <div className='mt-10 grid grid-cols-2 gap-x-12 gap-y-8 relative'>
            <div>
                <h2 className='mt-11 font-semibold text-2xl '>인기 팟캐스트</h2>
                <p className='mt-3'><span className='text-blue-400 font-semibold'>{data?.popularPodcasts.popularPodcasts?.length}</span>개의 채널</p>
            </div>
            <div></div>
            {data?.popularPodcasts.popularPodcasts?.map((podcast, index) => (
                <div>
                    <div className=''>
                         <Link 
                             className="flex justify-items" 
                             to={`/${podcast.id}`}>
                             <div
                                 className='w-24 h-24 bg-center bg-cover rounded-lg'
                                 style={{backgroundImage: `url(${podcast.thumbnail})`}}
                             />
                             <h3 className={`text-2xl ml-4 font-extrabold self-center ${index <= 3 ? 'text-blue-400' : 'text-black'}`}>
                                 {index +1}
                             </h3>
                             <div className="ml-7 flex flex-col">
                                 <h3 className="text-lg font-semibold">{podcast.title}</h3>
                                 <p className="text-sm text-gray-400">
                                     {podcast.description && podcast.description.length >35 ? 
                                     `${podcast.description.substring(0,35)}...` : podcast.description}
                                 </p>
                                 <div className='flex'>
                                     <span 
                                         className='mt-1 text-sm font-medium text-gray-700'
                                     >{podcast.updateAt.substring(0,10).replace(/-/g, ".")}</span>
                                     <p></p>
                                     <p className='text-gray-500 text-sm mt-1 ml-2'>구독자 <span className='text-gray-900'>
                                        {podcast.subscriber ? `${podcast.subscriber?.length}`: 0}</span>
                                    </p>
                                 </div>
                             </div>
                         </Link>
                     </div>
                </div>
            ))}
            </div>
        </div>
    )
}