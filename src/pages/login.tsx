import React from 'react';
import { useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { loginMutation, loginMutationVariables, loginMutation_login } from '../__generated__/loginMutation';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { authTokenVar, isLoggedInVar } from '../apollo';

interface IFormProps {
    email: string;
    password: string;
}

const LOGIN_MUTATION = gql`
mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
        ok
        token
        error
    }
}
`;


const onCompleted = (data: loginMutation) => {
    console.log("completed Data", data);
    const {
        login: {ok, token, error}
    } = data;
    try {
        if(ok && token) {
            localStorage.setItem(LOCALSTORAGE_TOKEN, token);
            authTokenVar(token);
            isLoggedInVar(true);
        }
    } catch(error) {
    console.log(error);
    }
}


export const Login = () => {
    const {register, getValues, watch, handleSubmit, formState} = useForm<IFormProps>();
    const {email, password} = getValues();
    const [loginMutaion, {data}] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
        onCompleted,
        variables: {loginInput: {email, password}}
    });

    const handleOnSubmit = () => {
        loginMutaion();
    }

    return (
        <div className={'bg-red-500 min-h-screen flex items-center justify-center text-black text-4xl'}>
            <form
                onSubmit={handleSubmit(handleOnSubmit)}
            >
                <input
                    ref={register({required: "Email is required"})}
                    name="email"
                    type="email"
                    placeholder="email"
                />
                <input 
                    ref={register({required: "Email is required"})}
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button>
                    Login
                </button>

            </form>
        </div>
    )
}