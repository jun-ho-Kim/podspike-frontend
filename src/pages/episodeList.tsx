import { gql, useQuery } from "@apollo/client";
import React from 'react';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useMe } from "../components/hooks/useMe";
import { getEpisode } from "../__generated__/getEpisode";

export const GETEPISODE_QUERY = gql`
    query getEpisode($input: GetEpisodeInput!) {
        getAllEpisode(input: $input) {
            ok
            error
            episodes {
                id
                title
                createdAt
                seenUser{
                    id
                }
            }
        }
    }
`;

interface IParam {
    id: string;
}

export const EpisodeList = () => {
    const me = useMe();
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
        <div className="mt-28 lg:w-96 sm:w-60">
            <h5 className='w-20 mb-5 font-medium border-blue-400 border-b-4'>에피소드 <span className='text-blue-500'>{data?.getAllEpisode.episodes?.length}</span></h5>
            {data?.getAllEpisode.episodes &&  data?.getAllEpisode.episodes.map((episode, index) => (
                <div  className={`mt-2 ${episode.seenUser && episode.seenUser.some(seenUser => seenUser.id === me.data?.me.id) && 'opacity-60'}`}>
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
                        <div className='flex'>
                            {me.data?.me.role === "Listener" && episode.seenUser && episode.seenUser.some(seenUser => seenUser.id === me.data?.me.id) 
                            && <p className='mr-5 self-center'>✔</p>}
                            <div 
                                style={{backgroundImage: `url()`}} 
                                className='bg-gray-400 w-14 h-14 mb-2'    
                            />
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}