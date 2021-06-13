import { gql, useQuery } from "@apollo/client";
import { url } from "inspector";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEpisodeDetail_Query, getEpisodeDetail_QueryVariables } from "../__generated__/getEpisodeDetail_Query";

export const DETAILEPISODE_QUERY = gql`
    query getEpisodeDetail_Query($input: GetEpisodeDetailInput!) {
        getEpisodeDetail(input: $input) {
            ok
            error
            episode {
                id
                title
                description
                createdAt
                podcast {
                    id
                    title
                    thumbnail
                }
            }
        }
    }
`;

interface IParam {
    episodeId: string;
}

export const DetailEpisode = () => {
    const {episodeId} = useParams<IParam>();
    const onCompleted = (data: getEpisodeDetail_Query) => {
        console.log("EpisodeData", data);
        const {
            getEpisodeDetail: {ok, episode}
        } = data;
        let createdAt = data?.getEpisodeDetail.episode?.createdAt.substring(2,10).replace(/-/g, ".");
}
    const {data, loading, error} = useQuery<
        getEpisodeDetail_Query, 
        getEpisodeDetail_QueryVariables
    >(DETAILEPISODE_QUERY, {
        onCompleted,
        variables: {
            input: {
                id: +episodeId
            }
        }
    });

    console.log("EpisodeData err", error);


    return (
        <div>
            
            {data?.getEpisodeDetail.episode && (
                <div className='flex flex-col items-center mt-10'>
                    <div className='flex content-start '>
                        <div
                            className='bg-yellow-800 w-max h-2 p-5 mr-5' 
                            style={{backgroundImage: `url(${data?.getEpisodeDetail.episode.podcast.thumbnail})`}} 
                        /> 
                        <div className='flex flex-col'>
                            <h3 className='text-4xl font-semibold'>{data?.getEpisodeDetail.episode.title}</h3>
                            <Link to={`/${data?.getEpisodeDetail.episode.podcast.id}`}>
                            <h4 className='text-blue-400 text-base font-serif font-medium'    
                            >
                                {`${data?.getEpisodeDetail.episode.podcast.title} >`}
                            </h4>
                            </Link>
                            <span>{data?.getEpisodeDetail.episode?.createdAt.substring(2,10).replace(/-/g, ".")}</span>
                            <span>{data?.getEpisodeDetail.episode.description}</span>
                            <button className='bg-blue-500 px-6 py-2 rounded-3xl text-white mt-2'>▶ 에피소드 듣기</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}