import { gql, useQuery } from "@apollo/client";
import React  from 'react';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { getPodcast_Query } from "../__generated__/getPodcast_Query";
import { PodcastList } from "../components/podcastList";
import { recentPodcasts_Query } from "../__generated__/recentPodcasts_Query";
import { PopularEpisodes } from "../pages/Listener/popular-episodes";

export const GETPODCAST_QUERY = gql`
    query getPodcast_Query {
        getPodcast {
            error
            ok
            podcast {
                id
                title
                category
                description
                thumbnail
                host {
                    id
                    nickName
                }
            }
        }
    }
`;

export const RECENTPODCAST_QUERY = gql`
    query recentPodcasts_Query {
        recentPodcasts {
            error
            ok
            podcast {
                id
                title
                category
                description
                thumbnail
                host {
                    id
                    nickName
                }
            }
        }
    }
`;

export const Home = () =>  {
    const {data, loading, error} = useQuery<recentPodcasts_Query>(RECENTPODCAST_QUERY, {
    });
    console.log("DATA", data)
    return (
    <div>
        <Helmet>
            <title>홈 | Podspike</title>
        </Helmet>
        <div className='w-full m-3 flex flex-col justify-center items-center' >
            {loading ? "Loading..." : (
            <>
            <h1 className='font-semibold mt-10 mb-6 text-xl '>뭐 듣지 고민된다면, 신규 팟캐스트</h1>
                <div className='lg:grid grid-cols-6 gap-6 sm:flex sm: flex-col'>
                    {data?.recentPodcasts.podcast && data?.recentPodcasts.podcast.map((podcast) => 
                    <Link key={podcast.id} to={`/${podcast.id}`}>
                        <PodcastList 
                            title={podcast.title}
                            nickName={podcast.host.nickName}
                            thumbnail={podcast.thumbnail}
                        />
                    </Link>
                )}
                </div>
            </>
            )}
            <PopularEpisodes />
        </div>
    </div>
    )
}

export default Home

