import { gql, useQuery } from "@apollo/client";
import React, { useRef, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { Subscribe } from "../components/subscribe";
import { Subscriptions } from "./Listener/subscriptions";
import { DetailPodcast, DetailPodcastVariables } from "../__generated__/DetailPodcast";
import { EpisodeList } from "./episodeList";
import { myPodcastsQuery } from "../__generated__/myPodcastsQuery";
import { MYPODCASTS_QUERY } from "./Host/myPodcasts";
import { useMe } from "../components/hooks/useMe";
import { UserRole } from "../__generated__/globalTypes";



interface PodcastPopupProps {
    dropDownRef: React.MutableRefObject<HTMLDivElement>;
    popup: boolean | null;
    isHost: boolean | null;
    id: string;
}

const PodcastPopup: React.FC<PodcastPopupProps> = ({dropDownRef, popup, isHost, id}) => {
    return (
        <div
            ref={dropDownRef}
            className='absolute top-8 left-0 w-max'
        >
            {popup === true &&
                <div className='grid grid-rows-3 gap-y-2 p-4 rounded-lg bg-blue-400 bg-opacity-50 '>
                    <Link 
                        className='hover:text-white'
                        to={`/${id}/create-episode`}>
                        ▪ 에피소드 생성
                    </Link>
                    <Link 
                        className='hover:text-white'
                        to={`/${id}/edit-podcast`}>
                        ▪ 팟캐스트 수정
                    </Link>
                    <Link 
                        className='hover:text-white'
                        to={`/${id}/delete-podcast`}>
                        ▪ 팟캐스트 삭제
                    </Link>
                </div>
            }
        </div>
    )
}

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
                subscriber {
                    id
                }
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
    const dropDownRef = useRef<HTMLDivElement>(document.createElement("div"))
    const [popup, setPopup] = useState(false);
    const me = useMe();

    const handleOnBarClick = () => {
        setPopup(!popup);
    }
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
                    <div className=''>
                        <div className='lg:flex lg:flex-row sm:flex-col'>
                            <div 
                                style={{backgroundImage: `url(${data?.getPodcastOne.podcast.thumbnail})`}} 
                                className='bg-cover bg-center w-40 h-40 rounded-lg'  />
                                <div className='flex flex-col ml-7'>
                                    <span className='text-blue-500 font-semibold '># {data?.getPodcastOne.podcast.category}</span>
                                    <h3 className='text-xl font-semibold'>{data?.getPodcastOne.podcast.title}</h3>
                                    <p className='text-gray-500 text-sm mt-2'>구독자 <span className='text-gray-900'>
                                        {`${data?.getPodcastOne.podcast.subscriber && data?.getPodcastOne.podcast.subscriber?.length 
                                        ? data?.getPodcastOne.podcast.subscriber?.length
                                        : 0
                                    }`}</span>
                                    </p>
                                    <span className='text-base mt-2 mb-4'>{data?.getPodcastOne.podcast.description}</span>
                                    {myPodcasts?.myPodcasts.myPodcasts 
                                    && myPodcasts.myPodcasts.myPodcasts.some(myPod => myPod.id === +id)
                                    ? (
                                    <div className='relative'>
                                    <i 
                                        onClick={handleOnBarClick}
                                        className="fas fa-bars text-3xl text-blue-500 relative">

                                    </i>
                                    <PodcastPopup 
                                        dropDownRef={dropDownRef}
                                        popup={popup}
                                        isHost={me.data?.me.role === UserRole.Host}
                                        id={id}
                                    />
                                    </div>
                                    )
                                    : <Subscribe />
                                    }
                            </div>
                        </div>
                        {/* <h2 className='text-2xl mt-10'>Episodes</h2> */}
                        <EpisodeList />

                        {/* <CreateReview /> */}
                    </div>
                }
                </div>
            )}

        </div>
    )
}