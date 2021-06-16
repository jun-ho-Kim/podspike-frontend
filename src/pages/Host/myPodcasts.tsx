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
        <div className='w-full m-3 flex flex-col justify-center items-center' >
            <Helmet>
                <title>팟캐스트 관리 | Podspike</title>
            </Helmet>
            {loading ? "Loading..." : (
            <>
            <h1 className='font-semibold mb-3 '>팟캐스트 관리</h1>
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
        <audio
        controls
        src="https://podspike-audio.s3.ap-northeast-2.amazonaws.com/1623556708087_%EC%82%90%EC%95%BD%EC%9D%B4.m4a">
            Your browser does not support the
            <code>audio</code> element.
    </audio>
    </div>
    )
}