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
                // takeNumber: 10
            }
        }
    });
    console.log("searchPodcast", data)

    useEffect(() => {
        searchPodcastQuery()
    }, [searchQuery]);

    return(
        <div className="w-max h-screen">
            <h2>searchTest</h2>
            {data?.searchPodcast.podcasts && data?.searchPodcast.podcasts.map((podcast, index) => (
                <span>{podcast.title}</span>
            ))}
        </div>
    )
}