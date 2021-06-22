import { useMutation, gql } from "@apollo/client";
import axios from "axios";
import React, { useRef, useState } from 'react';
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { createEpisodeMutation, createEpisodeMutationVariables } from "../../__generated__/createEpisodeMutation";
import { GETEPISODE_QUERY } from "../episodeList";

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
    const [episodeImgFileUrl, setEpisodeImgFileUrl] = useState();
    const [audioLength, setAudioLength] = useState<number | null>()
    const audio =  useRef<HTMLAudioElement>(document.createElement("audio"));
    const [audioFileUrl, setAudioFileUrl] = useState<string | null>();
    const history = useHistory();
    const { register, getValues, formState, handleSubmit } = useForm({
        mode: "onChange",
    });
    // let audioLength: number;
    const onCompleted = () => {
        history.goBack();
    }

    const audioLengthFunc = async  (filUrl: string) => {
        audio.current.onloadedmetadata = () => {
           return audio.current.src = filUrl;
        };
        console.log("audioLengthFunc audio.current.src", audio.current.src)
        audio.current.load = () => {
            return setAudioLength(audio.current.duration);
        };;
        ;
        return audioLength
        
    }
    
    const { title, description, audioFile, episodeImg } = getValues();
    const [createEpisode, {data, loading, error}] = useMutation<createEpisodeMutation, createEpisodeMutationVariables>(CREATEEPISODE_MUTATION, {
        onCompleted,
        variables: {
            input: {
                id: +id,
                title,
                description,
                audioUrl: audioFileUrl,
                audioLength: 0,
                seenNum: 0,
                episodeImg: episodeImgFileUrl,
            }
        },
        // refetchQueries: [
            //     {
                //         query: GETEPISODE_QUERY
                //     }
                // ]
            });
            console.log("data", data);
            
            const handleOnSubmit = async () => {
                let fileUrl: string;
                console.log("epiimg", episodeImg);
                
                if(episodeImg && episodeImg.length >0) {
                    const formBody = new FormData();
                    formBody.append("file", episodeImg[0]);
                    await axios.post('https://podspike.herokuapp.com/uploads', formBody)
                    .then(response => {
                        if(response) {
                    setEpisodeImgFileUrl(response.data.url);
                    console.log("setEpisodeImgFileUrl", episodeImgFileUrl)
                    console.log("episodeImg response.data.url", response.data.url)
                } else {
                    console.log('error');
                }
            })
        }


        if(audioFile && audioFile.length > 0) {
            // const file = audioFile[0]
            const formBody = new FormData()
            formBody.append("file", audioFile[0]);
            console.log("audio FormBody", formBody);
            await axios.post('https://podspike.herokuapp.com/uploads/audio', formBody)
            .then(response => {
                console.log("response", response)
                if(response) {
                    setAudioFileUrl(response.data.url);
                    fileUrl = response.data.url;
                    console.log("response.data.url", response.data.url);
                    // audioLengthFunc(fileUrl);
                } else {
                    console.log("error", error);
                }
                console.log("file", fileUrl)
            });
            
        }
        console.log("audioLength", audio);
        createEpisode();
    }
    return (
        <div className="font-bold  w-screen h-screen min-w-max flex flex-col justify-center items-center">
            <Helmet>
                <title>에피소드 생성 | Podspike</title>
            </Helmet>            
            <h1
                className='mb-2 text-2xl font-bold text-center'
            >
                에피소드 생성
            </h1>
            <form
                className='grid gap-2 mt-6' 
                onSubmit={handleSubmit(handleOnSubmit)}>
                <label>
                    에피소드 제목
                </label>
                <input
                    className="border font-bold border-gray-400 rounded-md py-3 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500"
                    ref={register({
                        required: "에피소드 제목을 입력해주세요."
                    })}
                    name="title"
                    placeholder='에피소드 제목'
                />
                <label>
                    에피소드 설명
                </label>
                <input
                    className="border font-bold border-gray-400 rounded-md py-3 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500"
                    ref={register({
                        required: "에피소드 설명을 입력해주세요."
                    })}
                    name="description"
                    placeholder='에피소드 설명'
                />
                <label className='mt-5'>
                    에피소드 썸네일
                </label>                
                <input
                    ref={register()}
                    name="episodeImg"
                    type="file"
                    accept="image/*"
                />
                <label className='mt-5'>
                    에피소드 오디오파일
                </label>
                <input
                    ref={register({
                        required: "오디오 파일을 등록해주세요."
                    })}
                    className=''
                    name="audioFile"
                    type="file"
                    accept="audio/*"
                />
                <Button canClick={formState.isValid} loading={loading} text="에피소드 추가" />
            </form>
        </div>
    )
}