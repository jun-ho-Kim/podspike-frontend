import { gql, useQuery } from "@apollo/client";
import React  from 'react';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { getPodcast_Query } from "../__generated__/getPodcast_Query";
import { PodcastList } from "../components/podcastList";

export const GETPODCAST_QUERY = gql`
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
                host {
                    id
                    nickName
                }
            }
        }
    }
`;

export const Home = () =>  {
    const {data, loading, error} = useQuery<getPodcast_Query>(GETPODCAST_QUERY, {
    });
    console.log("DATA", data)
    return (
    <div>
        <div className='w-full m-3 flex flex-col justify-center items-center' >
            <Helmet>
                <title>홈 | Podspike</title>
            </Helmet>
            {loading ? "Loading..." : (
            <>
            <h1 className='font-semibold mb-3 '>신규 팟캐스트</h1>
                <div className='grid grid-cols-6 gap-6'>
                    {data?.getPodcast.podcast && data?.getPodcast.podcast.map((podcast) => 
                    <Link key={podcast.id} to={`/${podcast.id}`}>
                        <PodcastList 
                            title={podcast.title}
                            nickName={podcast.host.nickName}
                            thumbnail={podcast.thumbnail}
                        />
                    </Link>
                )}
                </div>
            </>
            )}
        </div>
    </div>
    )
}

export default Home

