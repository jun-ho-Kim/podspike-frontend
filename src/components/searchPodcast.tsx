import { gql, useQuery, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { searchPodcast, searchPodcastVariables } from "../__generated__/searchPodcast";

export const SEARCHPODCAST_QUERY = gql`
    query searchPodcast($input: SearchPodcastInput!) {
        searchPodcast(input: $input) {
            ok
            error
            totalPage
            totalResults
            currentPage
            currentCount
            podcasts {
                id
                title
                thumbnail
                updateAt
            }
        }
    }
`;

export const SearchPodcast = () => {
    const {search} = useLocation();
    console.log("location search", search);
    const searchQuery = search.split('query=')[1];
    console.log("searchQuery", searchQuery);
    const [searchPodcastQuery, {data, loading, error}] = useLazyQuery<searchPodcast, searchPodcastVariables>(SEARCHPODCAST_QUERY, {
        variables: {
            input: {
                page: 1,
                query: searchQuery,
                takeNumber: 10
            }
        }
    });
    console.log("searchPodcast", data)

    useEffect(() => {
        searchPodcastQuery()
    }, [searchQuery]);

    return(
        <div>
            {}
            {loading ? "Loading..." : (
                <div>
                    {searchQuery === undefined ?
                        <div className='flex justify-center mt-20'>
                            <p className='font-medium text-lg'>검색어를 입력해주세요</p>
                        </div>    
                        : ( 
                        <div className="h-screen min-w-min flex flex-col items-center mt-10">
                            <div className=''>
                                <h2 className='text-lg font-bold pl-10 mr-2 inline'>검색 결과 - </h2>
                                <span className='text-lg font-bold' >채널
                                    <p className='text-blue-400 ml-2 inline'>
                                        {data?.searchPodcast.podcasts 
                                        && data?.searchPodcast.podcasts?.length > 0 
                                        ? data?.searchPodcast.podcasts?.length 
                                        : <>0
                                        <span className='block mt-7'> 검색 결과를 찾을 수 없습니다.</span></>}
                                    </p>
                                </span>
                            </div>
                            {data?.searchPodcast.podcasts && data?.searchPodcast.podcasts.map((podcast, index) => (
                                <div className='mt-8 flex'>
                                    <div
                                        className='w-16 h-16 bg-gray-500 bg-cover bg-center rounded-lg'
                                        style={{backgroundImage: `url(${podcast.thumbnail})`}}
                                    />
                                    <div className='flex flex-col ml-3 justify-between border-gray-200 bottom-4 border-b-2 border-opacity-60 pr-60'>
                                        <span className='font-extrabold text-lg'>{podcast.title}</span>
                                        <span className='opacity-60 text-xs mb-2'>{podcast.updateAt.substring(2,10).replace(/-/g, ".")}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    )}
                </div>
            )}
        </div>
    )
}