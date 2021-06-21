import { useMutation, gql } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { updatePodcast } from "../../__generated__/updatePodcast";
import { categoryList } from "../categories";

const UPDATEPODCAST_MUTATION = gql`
    mutation updatePodcast($input: UpdatePodcastInput!) {
        updatePodcast(input: $input) {
            ok
            error
        }
    }
`

interface IParams {
    id: string;
}

export const UpdatePodcast = () => {
    const {id} = useParams<IParams>()
    const history = useHistory();
    const { register, getValues, formState, handleSubmit } = useForm();

    const { title, description, category } = getValues();
    const onCompleted = (data: updatePodcast) => {
        const {
            updatePodcast: {ok, error}
        } = data;
        console.log("update Completed", ok)
        console.log("error", error);
        if(ok) {
            alert("수정이 완료되었습니다.")
            history.push("/")
        } else {
            alert("팟캐스트가 존재하지 않습니다.");
        }
    }
    useEffect(() => {
        console.log("id", id, typeof id)
    })

    const [updatePodcast, {data, loading, error} ] = useMutation(UPDATEPODCAST_MUTATION, {
        onCompleted,
        variables: {
            input: {
                id: +id,
                title,
                category,
            }
        }
    });
    
    const handleOnSubmit = () => {
        updatePodcast()
    }

    return (
        <div className='font-bold w-screen h-screen min-w-max flex flex-col justify-center items-center'>
            <h1 className='text-2xl font-bold text-center'>
                팟캐스트 수정
            </h1>
            <form
                className='grid gap-y-2 mt-6'
                onSubmit={handleSubmit(handleOnSubmit)}>
                <label>
                    방송명
                </label>
                <input
                    className="border font-bold border-gray-400 rounded-md py-3 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500"
                    ref={register()}
                    name="title"
                    placeholder='방송명'
                />
                <label>
                    방송설명
                </label>
                <input
                    className="border font-bold border-gray-400 rounded-md py-3 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500"
                    ref={register()}
                    name="description"
                    placeholder='방송 설명'
                />
                <label className='mt-2'>
                    카테고리
                </label>                
                <select
                    className='border py-1 rounded-lg mb-4'
                    ref={register()}
                    name="category"
                >
                
                {categoryList.map((category, index) => (
                    <option key={index}>{category}</option>
                ))}
                </select>
                <Button canClick={formState.isValid} loading={loading} text="방송 수정" />
            </form>
        </div>
    )
}