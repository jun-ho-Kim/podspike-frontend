import { gql, useQuery } from "@apollo/client";
import React from 'react';
import { Link, useParams } from "react-router-dom";
import { DetailPodcast, DetailPodcastVariables } from "../__generated__/DetailPodcast";
import {CreatePodcast} from "./Host/create-podcast"
import { UpdatePodcast } from "./Host/update-podcast";

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

    console.log("Data", data)
    return (
        <div className='mt-10 flex justify-center items-center'>
            {loading ? "Loading..." : (
                <div className=' '>
                {data?.getPodcastOne.podcast &&
                    <div className='flex flex-col justify-center items-center'>
                        <div style={{backgroundImage: `url(${data?.getPodcastOne.podcast.thumbnail})`}} className='bg-cover bg-center px-28 py-14'  />
                        <h3>{data?.getPodcastOne.podcast.title}</h3>
                        <span>{data?.getPodcastOne.podcast.category}</span>
                        <span className='text-xs'>{data?.getPodcastOne.podcast.description}</span>
                        <h2 className='text-2xl mt-10'>Episodes</h2>
                        <Link to={`${id}/update-podcast`}>
                            수정
                        </Link>
                        <Link to={`${id}/delete-podcast`}>삭제</Link>
                        <UpdatePodcast/>

                        <Link to={`/${id}/episodes`}>에피소드</Link>
                        <Link to={`/${id}/create-episode`}>에피소드 추가</Link>
                    </div>
                }
                </div>
            )}

        </div>
    )
}