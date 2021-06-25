import {  gql, useQuery } from "@apollo/client";
import React from 'react';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { myPodcastsQuery } from "../../__generated__/myPodcastsQuery";
import { PodcastList } from "../../components/podcastList";

export const MYPODCASTS_QUERY = gql`
    query myPodcastsQuery {
        myPodcasts {
            ok
            error
            myPodcasts {
                id
                title
                createdAt
                thumbnail
                category
                description
            }
        }
    }
`;

export const MyPodcasts = () => {
    const {data, loading, error} = useQuery<myPodcastsQuery>(MYPODCASTS_QUERY);
    return (
<div>
        <div className='w-full h-screen m-3 flex flex-col items-center' >
            <Helmet>
                <title>팟캐스트 관리 | Podspike</title>
            </Helmet>
            {loading ? "Loading..." : (
            <>
            <h1 className='font-semibold text-xl mt-10 mb-3 '>팟캐스트 관리</h1>
                <div className='flex flex-col'>
                    {data?.myPodcasts.myPodcasts && data?.myPodcasts.myPodcasts.map((podcast, index) => 
                    <Link key={podcast.id} to={`/${podcast.id}`}>
                        <PodcastList
                            title={podcast.title}
                            nickName=""
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