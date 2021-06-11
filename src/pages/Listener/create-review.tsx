import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";

export const CREATEREVIEW_MUTATION = gql`
    mutation createReviewMutation($input: CreateReviewInput!) {
        createReview(input: $input) {
            ok
            error
        }
    }
`;

export const CreateReview = () => {
    const {register, getValues, formState, handleSubmit} = useForm();
    const [createReviewMutaion ,{data, loading, error}] = useMutation(CREATEREVIEW_MUTATION, {
        
    });
    console.log("createReview data", data)
    
    return (
        <div>
            <form>
                <input
                    className="border"
                    name="title"
                />
                <input
                    className="border"
                    name="text"
                />
                <audio></audio>
                <Button canClick={formState.isValid} loading={false} text="등록"></Button>
            </form>
        </div>
    )
}