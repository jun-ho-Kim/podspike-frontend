import { useMutation, gql } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { updatePodcast } from "../../__generated__/updatePodcast";
import { categories } from "../categories";

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
        <div>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <h4>팟캐스트 수정</h4>
                <label>
                    방송명
                </label>
                <input
                    className="border"
                    ref={register()}
                    name="title"
                />
                <label>
                    방송설명
                </label>
                <input
                    className="border"
                    ref={register()}
                    name="description"
                />
                <select
                    ref={register()}
                    name="category"
                >
                
                {categories.map((category, index) => (
                    <option key={index}>{category}</option>

                ))}
                </select>
                <Button canClick={formState.isValid} loading={loading} text="text" />
            </form>
        </div>
    )
}