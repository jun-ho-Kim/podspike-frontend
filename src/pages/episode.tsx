import { gql, useQuery } from "@apollo/client";
import { url } from "inspector";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PlayerContext } from "../routers/logged-in-router";
import { AudioPlayer } from "../components/audioPlayer";
import { getEpisodeDetail_Query, getEpisodeDetail_QueryVariables } from "../__generated__/getEpisodeDetail_Query";
import { useMe } from "../components/hooks/useMe";

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
                audioUrl
                seenUser{
                    id
                }
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
    const audioPlayerState = useContext(PlayerContext)
    const {episodeId} = useParams<IParam>();
    const me = useMe();
    const onCompleted = (data: getEpisodeDetail_Query) => {
        console.log("EpisodeData", data);
        const {
            getEpisodeDetail: {ok, episode}
        } = data;
        let createdAt = data?.getEpisodeDetail.episode?.createdAt.substring(2,10).replace(/-/g, ".");
        audioPlayerState?.setAudioUrl(`${episode?.audioUrl}`)
        audioPlayerState?.setEpisode(episode);
        // audioPlayerState?.setEpisode(data?.getEpisodeDetail.episode);
        console.log("setepisode", audioPlayerState?.episode)
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
        const hanldeOnClick = () => {
            audioPlayerState?.setIsShowing(true);
            // if(audioPlayerState?.isPlaying) {
                //     audioPlayerState?.setIsPlaying(false);
                // } else {
                    //     audioPlayerState?.setIsPlaying(true);
                    // }
                }
                
                useEffect(() => {
                    audioPlayerState?.setThumbnail(`${data?.getEpisodeDetail.episode?.podcast.thumbnail}`);
                }, [])
                
    return (
        <div>
        {data?.getEpisodeDetail.episode && (
            <div className='flex flex-col items-center mt-10'>
                <div className='lg:flex lg:flex-row content-start sm:flex'>
                    <div
                        className='bg-yellow-800 w-40 h-40 p-5 mr-5 bg-center bg-cover rounded-lg' 
                        style={{backgroundImage: `url(${data?.getEpisodeDetail.episode.podcast.thumbnail})`}} 
                        /> 
                    <div className='flex flex-col'>
                        <div className='flex justify-between w-72'>
                            <h3 className='text-2xl font-semibold'>{data?.getEpisodeDetail.episode.title}</h3>
                            {me.data?.me.role === "Listener" && data.getEpisodeDetail.episode.seenUser && data.getEpisodeDetail.episode.seenUser.some(seenUser => seenUser.id === me.data?.me.id) 
                            && <p className='mt-2 text-2xl'>✔</p>}
                        </div>
                        <Link to={`/${data?.getEpisodeDetail.episode.podcast.id}`}>
                        <h4 className='text-blue-400 text-base font-serif font-medium'    
                        >
                            {`${data?.getEpisodeDetail.episode.podcast.title} >`}
                        </h4>
                        </Link>
                        <span>{data?.getEpisodeDetail.episode?.createdAt.substring(2,10).replace(/-/g, ".")}</span>
                        <span>{data?.getEpisodeDetail.episode.description}</span>
                        <button
                            onClick={hanldeOnClick} 
                            className='bg-blue-500 px-6 py-2 rounded-3xl text-white mt-2'>{`${audioPlayerState?.isPlaying? '⏸ 일시중지'  : '▶ 에피소드 듣기'} `}</button>                    
                    </div>
                </div>
            </div>
        )}
        </div>
    )
}