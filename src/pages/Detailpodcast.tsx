import { gql, useQuery } from "@apollo/client";
import React from 'react';
import { Link, useParams } from "react-router-dom";
import { Subscribe } from "../components/subscribe";
import { Subscriptions } from "./Listener/subscriptions";
import { DetailPodcast, DetailPodcastVariables } from "../__generated__/DetailPodcast";
import { EpisodeList } from "./episodeList";
import { myPodcastsQuery } from "../__generated__/myPodcastsQuery";
import { MYPODCASTS_QUERY } from "./Host/myPodcasts";

export const PODCAST_QUERY = gql`
    query DetailPodcast($input: GetPodcastInput!) {
        getPodcastOne(input: $input) {
            error
            ok
            podcast {
                id
                title
                category
                description
                thumbnail
                episodes {
                    id
                    title
                }
            }
        }
    }

`;

interface IParams {
    id: string;
}

export const Podcast = () => {
    const {id} = useParams<IParams>();
    // const onCompleted = (data: DetailPodcast) => {
    //     const {getPodcastOne: {ok, error, podcast}} = data;
    //     if(ok) {

    //     } else {
    //         console.log(error);
    //         alert(error);
    //     }
    //     console.log("completed", data)
    // }
    const {data, loading, error} = useQuery<DetailPodcast, DetailPodcastVariables>(PODCAST_QUERY, {
        // onCompleted,
        variables: {
            input : {
                id: +id
            }
        }
    });

    const {data: myPodcasts} = useQuery<myPodcastsQuery>(MYPODCASTS_QUERY);

    console.log("Data", data)
    return (
        <div className='mt-10 flex justify-center items-center'>
            {loading ? "Loading..." : (
                <div className=' '>
                {data?.getPodcastOne.podcast &&
                    <div className='w-full'>
                        <div className='flex flex-rows'>
                            <div 
                                style={{backgroundImage: `url(${data?.getPodcastOne.podcast.thumbnail})`}} 
                                className='bg-cover bg-center px-14 py-14 rounded-lg'  />
                                <div className='flex flex-col ml-7'>
                                    <span className='text-blue-500 font-semibold'># {data?.getPodcastOne.podcast.category}</span>
                                    <h3 className='text-xl font-semibold'>{data?.getPodcastOne.podcast.title}</h3>
                                    <span className='text-base mt-8'>{data?.getPodcastOne.podcast.description}</span>
                                    {myPodcasts?.myPodcasts.myPodcasts 
                                    && myPodcasts.myPodcasts.myPodcasts.some(myPod => myPod.id === +id)
                                    ? <Link to={`/${id}/create-episode`}>에피소드 추가</Link>
                                    : <Subscribe />
                                    }
                            </div>
                        </div>
                        {/* <h2 className='text-2xl mt-10'>Episodes</h2> */}
                        <EpisodeList />
                        <Link to={`${id}/update-podcast`}>
                            수정
                        </Link>
                        <Link to={`${id}/delete-podcast`}>삭제</Link>
                        <Link to={`/${id}/episodes`}>에피소드</Link>
                        
                        {/* <CreateReview /> */}
                    </div>
                }
                </div>
            )}

        </div>
    )
}