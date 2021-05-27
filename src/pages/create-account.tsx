import { useMutation, gql } from "@apollo/client";
import React  from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { createAccountMutation } from "../__generated__/createAccountMutation";
import { UserRole } from "../__generated__/globalTypes";


interface IFormProps {
    email: string;
    password: string;
    passwordConfirm: string;
    role: UserRole;

}

const CREATEACCOUNT = gql`
    mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
        createAccount(input: $createAccountInput) {
            ok
            error
        }
    }
`


export const CreateAccount = () => {
    const history = useHistory()
    const {register, getValues, errors, formState, handleSubmit} = useForm<IFormProps>({
        mode: "onChange",
        
    })
    const {email, password, passwordConfirm, role} = getValues();
    const onCompleted = (data: createAccountMutation) => {
        console.log("onCompleted", data);
        const {
            createAccount: {ok}
        } = data;
        try {
            if(ok) {
                alert('Success Create Account')
                history.push('/')

            }
        } catch(error) {
            console.log(error);
        };
    };

    
    const [creaetAccountMutaion, {data: createAccountResult, loading}] = useMutation(CREATEACCOUNT, {
        onCompleted,
        variables : {
            createAccountInput: {
                email,
                password,
                passwordConfirm,
                role,
            }
        }  
    })
    const handleOnSubmit = () => {
        creaetAccountMutaion();
    }
    return (
        <div className="w-screen h-screen min-w-max flex justify-center items-center font-mono">
            <div className=''>
            <h1
                className='mb-8 text-2xl font-bold text-center'
            >Create Account</h1>
            <form
                className='grid gap-6 '
                onSubmit={handleSubmit(handleOnSubmit)}
            >
                <input
                    className="border font-bold border-gray-400 rounded-md py-3 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500"
                    ref={register({
                        required: "Email is required",
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s  @"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}
                    name="email"
                    type="email"
                    placeholder="이메일"
                    size={27}
                />
                {errors.email?.message && <FormError error={errors.email?.message} />}
                {errors.email?.type === "pattern" && <FormError error="Please enter a valid email" />}
                <input
                    className="border font-bold border-gray-400 rounded-md py-3 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500"
                    ref={register({
                            required: "비밀번호를 입력하세요.",
                            minLength: {
                                value: 5,
                                message: '비밀번호는 5자리 이상 입력해야 합니다.'
                            },
                            maxLength: {
                                value: 16,
                                message: '비밀번호는 16자리 이하 입력해야 합니다.'
                            }
                        })}
                    size={27}
                    maxLength={16}
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                />
                {errors.password?.message && <FormError error={errors.password?.message}/>}
                <input
                    className='border font-bold border-gray-400 rounded-md py-3 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500'
                    ref={register({
                        required: "Password Confirm is required",
                        validate: (v) => {
                            if(v !== getValues().password) {
                                return "비밀번호가 일치하지 않습니다."
                            }
                            return true
                        }
                    })}
                    maxLength={16}
                    name="passwordConfirm"
                    type="password"
                    placeholder="비밀번호 확인"
                />
                {errors.passwordConfirm?.message && <FormError error={errors.passwordConfirm?.message} />}
                <select
                    className='border font-bold border-gray-400 rounded-md py-3 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500'
                    name="role"
                    ref={register({required: true})}
                >
                    <option>Host</option>
                    <option>Listener</option>
                {/* {Object.keys(UserRole).map((role, index) => {
                    <option key={index}>{role}</option>
                })} */}
                </select>
                <Button
                    canClick={formState.isValid}
                    loading={loading} 
                    text="회원가입"
                />
                <Link to='/'
                    className='mt-3 hover:underline text-center font-extrabold text-sm text-gray-400 hover:text-pink-500'
                >로그인</Link>
                {createAccountResult?.createAccount.error && <FormError error={createAccountResult?.createAccount.error} />}
            </form>
            </div>
        </div>
    )
}