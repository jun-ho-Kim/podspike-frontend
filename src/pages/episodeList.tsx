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
                description
                episodeImg
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
        <div className="w-max h-screen">
            <h4>episode</h4>
            {data?.getAllEpisode.episodes &&  data?.getAllEpisode.episodes.map((episode: any, index: number) => (
                <div>
                    <Link to={`${id}/episodes/${episode.id}`}>
                        <h4>{episode.title}</h4>
                    </Link>
                </div>
            ))}
        </div>
    );
}