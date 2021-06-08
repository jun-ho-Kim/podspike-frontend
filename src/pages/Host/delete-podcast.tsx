import { useMutation, gql } from "@apollo/client";
import React from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useParams } from 'react-router-dom';
import { Button } from "../../components/button";
import { deletePodcastMutation } from "../../__generated__/deletePodcastMutation";

interface IParam {
    id: string;
}

export const DELETEPODCAST_MUTATION = gql`
    mutation deletePodcastMutation($input: PodcastSearchInput!) {
        deletePodcast(input: $input) {
            ok
            error
        }
    }
`;

export const DeletePodcast = () => {
    const {id} = useParams<IParam>();
    const history = useHistory();
    const { formState } = useForm({
        mode: "onChange"
    });
    const onCompleted = (data: deletePodcastMutation) => {

    };

    
    const [deletePodcast, {data, loading, error}] = useMutation(DELETEPODCAST_MUTATION, {
        variables: {
            input: {
                id: +id
            }
        }
    })
    const handleOnSubmit = async () => {
        try {
            await deletePodcast()
        } catch(error) {
            console.log("delete error", error);
        } finally {
            history.push("/")
        }
    }
    return(
        <div>
            <form onSubmit={handleOnSubmit}> 
                <Button canClick={formState.isValid} loading={loading}  text="삭제하시겠습니까?" />
            </form>
        </div>
    )
}

////팟캐스트 삭제 후 history.push("/") 가 작동 안됨