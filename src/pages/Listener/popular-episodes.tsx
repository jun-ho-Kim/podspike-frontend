import { gql, useQuery } from "@apollo/client";
import React from 'react';
import { Link, useParams } from "react-router-dom";
import { popularEpisode_Query } from "../../__generated__/popularEpisode_Query";
import { PopularPodcasts } from '../Listener/popular-podcasts'

export const POPULAREPISODE_QUERY = gql`
    query popularEpisode_Query($input: PopularEpisodesInput!) {
        popularEpisodes(input: $input) {
            ok
            error
            popularEpisodes {
                id
                title
                episodeImg
                seenNum
                podcast {
                    id
                    title
                }
            }
        }
    } 
`;

export const PopularEpisodes = () => {
    const {id, episodeId} = useParams<string | any>();
    const { data, loading, error } = useQuery<popularEpisode_Query>(POPULAREPISODE_QUERY, {
        variables: {
            input: {
                page:1
            }
        }
    })
    console.log("popular data", data);
    return (
        <div className='flex flex-col mt-10'>
            <h3 className='font-semibold mt-10 mb-6 text-xl text-center'>가장 핫한 에피소드</h3>
            <div className='grid grid-cols-4'>
                {data?.popularEpisodes.popularEpisodes?.map((episode, index) => (
                    <Link key={index} to={`/${episode.podcast.id}/episodes/${episode.id}`}>
                        <div className='mx-8'>
                            <div 
                                style={{backgroundImage: `url(${episode.episodeImg})`}} 
                                className='bg-gray-400 w-40 h-32 bg-center bg-cover'    
                            />
                            <h4 className='font-semibold'>{episode.title && episode.title.length > 8 ? `${episode.title.substring(0,14)}...` : episode.title}</h4>
                            <span className='text-sm text-gray-400'>{episode.podcast.title && episode.podcast.title.length > 8 ? `${episode.podcast.title.substring(0,14)}...` : episode.podcast.title }</span>
                        </div>
                    </Link>
                ))}

            </div>
        </div>
    )
}