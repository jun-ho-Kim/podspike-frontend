import { useMutation, gql } from "@apollo/client";
import axios from "axios";
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";

export const CREATEEPISODE_MUTATION = gql`
    mutation createEpisodeMutation($input: CreateEpisodeInput!) {
        createEpisode(input: $input) {
            ok
            error
        }
    }
`;

interface IParam {
    id: string;
}

export const CreateEpisode = () => {
    const {id} = useParams<IParam>();
    const [file, setFile] = useState();
    const history = useHistory();
    const { register, getValues, formState, handleSubmit } = useForm({
        mode: "onChange",
    });

    const onCompleted = () => {
        history.push("/")
    }
    
    const { title, description, audioFile, episodeImg } = getValues();
    const [createEpisode, {data, loading, error}] = useMutation(CREATEEPISODE_MUTATION, {
        onCompleted,
        variables: {
            input: {
                id: +id,
                title,
                description,
                category: "null",
                episodeImg: "null",
                audioFile: file
                
            }

        }
    });
    console.log("data", data);
    
    const handleOnSubmit = async () => {
        // if(audioFile && audioFile.length > 0) {
        //     const file = audioFile[0]
        //     const formBody = new FormData()
        //     formBody.append("file", file);
        //     console.log("audio file", file);
        //     console.log("audio FormBody", formBody);
        //     await axios.post('http://localhost:5000/uploads/audio', formBody)
        //     .then(response => {
        //         console.log("response", response)
        //         if(response) {
        //             setFile(response.data.url);
        //             console.log("response.data.url", response.data.url);
        //         } else {
        //             console.log("error", error);
        //         }
        //     })
            createEpisode();
        }
        }
    return (
        <div>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <input
                    className="border"
                    ref={register({
                        required: "에피소드 제목을 입력해주세요."
                    })}
                    name="title"
                />

                <input
                    className="border"
                    ref={register({
                        required: "에피소드 내용을 입력해주세요."
                    })}
                    name="description"
                />
                <input
                    name="episodeImg"
                    type="file"
                    accept="image/*"
                />
                <label>
                    오디오파일
                </label>
                <input
                    ref={register({
                        required: "오디오 파일을 등록해주세요."
                    })}
                    name="audioFile"
                    type="file"
                    accept="audio/*"
                />
                <Button canClick={formState.isValid} loading={loading} text="에피소드 추가" />
            </form>
        </div>
    )
}