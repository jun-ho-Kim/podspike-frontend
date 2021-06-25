import React from 'react';
import { useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { loginMutation, loginMutationVariables } from '../__generated__/loginMutation';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { authTokenVar, isLoggedInVar } from '../apollo';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';
import { FormError } from '../components/form-error';
import { Helmet } from 'react-helmet';

interface IFormProps {
    email: string;
    password: string;
}

export const LOGIN_MUTATION = gql`
mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
        ok
        token
        error
    }
}
`;



export const Login = () => {
    const onCompleted = (data: loginMutation) => {
        console.log("completed Data", data);
        const {
            login: {ok, token}
        } = data;
        try {
            if(ok && token) {
                localStorage.setItem(LOCALSTORAGE_TOKEN, token);
                authTokenVar(token);
                isLoggedInVar(true);
            } else {
                alert("이메일이나 비밀번호가 올바르지 않습니다.")
            }
        } catch(error) {
        alert("이메일이나 비밀번호가 올바르지 않습니다.")
        }
    }
    const {register, getValues, errors, handleSubmit, formState} = useForm<IFormProps>({
        mode: "onChange"
    });
    const {email, password} = getValues();
    const [loginMutaion, {data: loginResult, loading}] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
        onCompleted,
        variables: {loginInput: {email, password}}
    });


    const handleOnSubmit = () => {
        loginMutaion();
    }

    return (
        <div className={'min-h-screen flex items-center justify-center text-black'}>
            <Helmet><title>login | Podspike</title></Helmet>
            <div>
            <h1
                className='mb-8 text-2xl font-bold text-center'
            >로그인</h1>
            
            <form
                className={'grid gap-6'}
                onSubmit={handleSubmit(handleOnSubmit)}
            >  
                <input
                    className="border font-bold border-gray-400 rounded-md py-3 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500"
                    ref={
                        register({required: "이메일을 입력해주세요",
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                    name="email"
                    type="email"
                    placeholder="이메일"
                    size={27}
                />
                {errors.email?.type === "pattern" && (<FormError error={"이메일을 입력해주세요"} /> )}
                {errors.email?.message && <FormError error={errors.email?.message}/>}
                <input
                    className="border font-bold border-gray-400 rounded-md py-3 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500"
                    ref={register({
                        required: "비밀번호를 입력해주세요.",
                        minLength: {
                            value: 3,
                            message: '비밀번호는 5자리 이상 입력해야 합니다.'
                        },
                        maxLength: {
                            value: 16,
                            message: '비밀번호는 16자리 이하 입력해야 합니다.'
                        }
                    })}
                    maxLength={16}
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                />
                {errors.password?.message && <FormError error={errors.password?.message}/>}
                <Button
                    canClick={formState.isValid}
                    text="로그인"
                    loading={loading}
                />
                <Link to='/create-account'
                    className='mt-3 hover:underline text-center font-extrabold text-sm text-gray-400 hover:text-pink-500'
                >회원가입</Link>
                {loginResult?.login.error && 
                    <FormError error={loginResult?.login.error} />
                }
            </form>
            </div>
        </div>
    )
}