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
                <div className='border border-black border-opacity-30 rounded-md'>
                <label className='flex'>
                <input
                    className=''
                    ref={register()}
                    name='searchQuery'
                    placeholder='검색'
                /> 
                <span onClick={handleOnSubmit}>🔍</span>
                </label>
                </div>
                
                {/* searchBar 따로 만들기> 아니면 useLazyQuery를 사용할지  */}
            </form>
        </div>
    )
}