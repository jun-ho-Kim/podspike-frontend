import { useMutation, gql } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import axios from 'axios'
import { createPodcastMutation } from "../../__generated__/createPodcastMutation";
import { useHistory } from "react-router";
import { GETPODCAST_QUERY } from '../home'
import { categoryList } from "../categories";

const CREATE_PODCAST_MUTATION = gql`
    mutation createPodcastMutation($input: CreatePodcastInput!) {
        createPodcast(input: $input) {
            ok
            error
        }
    }
`;

export const CreatePodcast = () => {
    const [thumbnail, setThumbnail] = useState();
    const history = useHistory()
    const {register, getValues, watch, formState, handleSubmit } = useForm({
        mode: "onChange"
    })
    const { title, description, thumbnailFile, category } = getValues();

    const onCompleted = (data: createPodcastMutation) => {
        const {
            createPodcast: {ok, error}
        } = data;
        if(ok) {
            history.push("/");
        }
    }

    const [createPodcast, {data, loading, error}] = useMutation(CREATE_PODCAST_MUTATION, {
        refetchQueries: [
            {
                query: GETPODCAST_QUERY
            }  
        ],
        onCompleted,
        variables: {
            input: {
                title,
                description,
                thumbnail,
                category,
            }
        }
    });
    const handleOnSubmit = async () => {
        
        if(thumbnailFile.length > 0) {
            const actualFile = thumbnailFile[0];
            const formBody = new FormData();
            formBody.append("file", actualFile);

            // const {url} = await (await fetch('https://podspike.herokuapp.com/uploads', {
            //     method: "POST",
            //     body: formBody
            // })
            // ).json();
            
            await await (axios.post('https://podspike.herokuapp.com/uploads', formBody)
            .then(response => {
                if(response.data.url) {
                    console.log("url", response.data.url)
                    setThumbnail(response.data.url);
                } else {
                    console.log("error", error);

                }
            })
            )
            createPodcast();
            console.log("form body", thumbnail);
        }
    }
        console.log("error", error)
    return (
        <div className="flex flex-col">
            <h4>방송 개설</h4>
            <form className="flex flex-col" onSubmit={handleSubmit(handleOnSubmit)}>
                <label className="font-bold text-lg">
                    방송명
                </label>
                <input
                    className="border h-8"
                    ref={register({
                        
                        required: "방송명을 입력해주세요",
                        maxLength: {
                            value: 50,
                            message: "50자 이하로 입력해주세요."
                        }
                    })}
                    name="title"
                    type="text"
                />
                <span>{`${title}/50`}</span>
                <label className="font-bold text-lg" >
                    방송 설명
                </label>
                <input
                    ref={register({
                        required: "방송소개를 입력해주세요.",
                        maxLength: {
                            value: 200,
                            message: "200자 이하로 입력해주세요."
                        }
                    })}
                    name="description"
                    placeholder="방송 소개"
                    type="text"
                />
                <label className="font-bold text-lg">
                    방송 썸네일 등록
                </label>
                <input
                    ref={register()}
                    name="thumbnailFile"
                    type="file"
                    accept="image/*"
                />
                <label className="font-bold text-lg">
                    카테고리
                </label>                
                <select
                    ref={register()}
                    name="category" 
                    placeholder="카테고리"
                >
                    {categoryList.map((category, index) => (
                        <option key={index}>{category}</option>
                    ))}
                </select>
                <Button canClick={formState.isValid} loading={loading} text="방송 개설하기" />
            </form>
        </div>
    )
}