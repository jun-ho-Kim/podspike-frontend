import { gql, useQuery } from "@apollo/client";
import React  from 'react';
import { Link } from "react-router-dom";
import { getPodcast_Query } from "../__generated__/getPodcast_Query";


const GETPODCAST_QUERY = gql`
    query getPodcast_Query {
        getPodcast {
            error
            ok
            podcast {
                id
                title
                category
                description
                thumbnail
            }
        }
    }
`;


export const Home = () =>  {
    const onCompleted = (data: getPodcast_Query) => {
        const {getPodcast: {ok, error, podcast}} = data;
        if(ok) {
            console.log("podcast", podcast)
        } else {
            alert(error);
        }
    }


    const {data, loading, error} = useQuery(GETPODCAST_QUERY, {
        onCompleted
    });
    // const {getPodcast: {podcast}} = data;
        console.log("Get Podcasts,", data)
    return (
        <div className='w-max m-3' >
            {loading ? "Loading..." : (
            <>
            <h1 className='font-semibold mb-3'>신규 팟캐스트</h1>
                <div className='w-max grid grid-cols-4 gap-2'>
                    {data?.getPodcast.podcast && data?.getPodcast.podcast.map((podcast: any) => 
                    <Link key={podcast.id} to={`/${podcast.id}`}>
                        <div style={{backgroundImage: `url(${podcast.thumbnail})`}} className='bg-cover bg-center mb-3  py-12'/>
                        <div className='mx-2'>
                            <h1 className='font-bold text-lg'>{podcast.title}</h1>
                            <span className='text-xs'>{podcast.description}</span>
                            <h3>{podcast.category}</h3>
                        </div>
                    </Link>
                )}
                </div>
            </>
            )}
        </div>
    )
}

export default Home
