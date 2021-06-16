import { gql, useQuery } from "@apollo/client";
import React from 'react';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getEpisode } from "../__generated__/getEpisode";

export const GETEPISODE_QUERY = gql`
    query getEpisode($input: GetEpisodeInput!) {
        getAllEpisode(input: $input) {
            ok
            error
            episodes {
                id
                title
                episodeImg
                createdAt
            }
        }
    }
`;

interface IParam {
    id: string;
}

export const EpisodeList = () => {

    const {id} = useParams<IParam>();
    const onCompleted = () => {

    }

    const {data, loading, error} = useQuery<getEpisode>(GETEPISODE_QUERY, {
        onCompleted,
        variables: {
            input: {
                id: +id,
            }
        }
    });
    console.log("episode data", data?.getAllEpisode.episodes);
    console.log("episode loading", loading);
    return (
        <div className="mt-20 w-96">
            <h5 className='w-20 mb-5 font-medium border-blue-400 border-b-4'>에피소드 <span className='text-blue-500'>{data?.getAllEpisode.episodes?.length}</span></h5>
            {data?.getAllEpisode.episodes &&  data?.getAllEpisode.episodes.map((episode, index) => (
                <div  className='mt-2'>
                    <Link 
                        className='flex justify-between border-gray-400 border-opacity-50 border-b-2'
                        to={`${id}/episodes/${episode.id}`}>
                        <div className=''>
                            <p className='text-gray-400 text-sm opacity-85'>{episode.createdAt.substring(0,10).replace(/-/g, ".")}</p>
                            <h4 className='font-medium text-lg'>
                                {episode.title && episode.title.length > 50 
                                ? `${episode.title.substring(0.49)}...`
                                : episode.title
                            }
                            </h4>
                        </div>
                        <div 
                            style={{backgroundImage: `url(${episode.episodeImg})`}} 
                            className='bg-gray-400 w-14 h-14 mb-2'    
                        />
                    </Link>
                </div>
            ))}
        </div>
    );
}