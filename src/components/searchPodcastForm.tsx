import { gql, useQuery, useLazyQuery } from "@apollo/client";
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { SearchPodcast } from "./searchPodcast";


export const SearchPodcastForm = () => {
    const history = useHistory()
    const {register, getValues, handleSubmit} = useForm();
    const {searchQuery} = getValues();

    
 
    
    const handleOnSubmit = (event: any) => {
        // event.preventDefault();
        console.log("search value", searchQuery);
        
        // searchPodcastQuery();    
        // console.log("search data", data);
        // console.log("search error", error);
        history.push(`/search?query=${searchQuery}`);
    };

    useEffect(() => {
        // searchPodcastQuery();
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <input
                    className='border'
                    ref={register()}
                    name='searchQuery'
                /> 

                {/* searchBar 따로 만들기> 아니면 useLazyQuery를 사용할지  */}
            </form>
        </div>
    )
}