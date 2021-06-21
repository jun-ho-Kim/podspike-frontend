import { gql, useQuery } from "@apollo/client";
import React from 'react';
import { popularEpisode_Query } from "../../__generated__/popularEpisode_Query";
import { PopularPodcasts } from '../Listener/popular-podcasts'

export const POPULAREPISODE_QUERY = gql`
    query popularEpisode_Query {
        popularEpisodes {
            ok
            error
            popularEpisodes {
                id
                title
                podcast {
                    id
                    title
                }
            }
        }
    } 
`;

export const PopularEpisodes = () => {
    const { data, loading, error } = useQuery<popularEpisode_Query>(POPULAREPISODE_QUERY)
    console.log("popular data", data);
    return (
        <div className='flex flex-col mt-10'>
            <h3 className='font-semibold mt-10 mb-6 text-xl'>가장 핫한 에피소드</h3>
            <div className='grid grid-cols-4'>
                {data?.popularEpisodes.popularEpisodes?.map((episode, index) => (
                    <div>
                        <div 
                            style={{backgroundImage: `url()`}} 
                            className='bg-gray-400 w-24 h-16'    
                        />
                        <h4>{episode.title}</h4>
                        <span>{episode.podcast.title}</span>
                    </div>
                ))}

            </div>
        </div>
    )
}