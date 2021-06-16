import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import { Button } from '../components/button';
import { useMe } from "../components/hooks/useMe";
import { meQuery, meQuery_me } from "../__generated__/meQuery";
import { editProfileMutation } from "../__generated__/editProfileMutation";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export const EDITPROFILE_MUTATION = gql`
    mutation editProfileMutation($input: EditProfileInput!) {
        editProfile(input: $input) {
            ok
            error
            user {
                id
                email
                nickName
                role
                profilePhoto

            }
        }
    }
`;


export const EditProfile = () => {
    const history = useHistory();
    const {data : me} = useMe();
    const [profilePhoto, setProfilePhoto] = useState();
    const {register, getValues, watch, formState,handleSubmit,errors, setValue} = useForm({
        mode: "onChange"
    });
    const {email, nickName, password, passwordConfirm, role, photo} = getValues();

    const onCompleted = (data: editProfileMutation) => {
        console.log("editProfileResult complete", data);
        const {
            editProfile: {ok}
        } = data;
        if(ok) {
            alert('회원정보 변경에 성공하였습니다.')
            history.push("/")
        } else {
            alert('회원정보 변경에 실패하였습니다.');
            console.log("error", error);
        }
    } 

    const [editProfileMutation, {data: editProfileResult, loading, error}] = useMutation(EDITPROFILE_MUTATION, {
        onCompleted,
        variables: {
            input: {
                email,
                ...(nickName !== "" && {nickName}),
                ...(password  !== "" && {password}),
                ...(passwordConfirm  !== "" && {passwordConfirm}),
                ...(profilePhoto !== "" && {profilePhoto}),
                role,
            }
        }
    });
    const handleOnChangeEmail = (event: any) => {
        event.preventDefault();
        alert("이메일은 변경할 수 없습니다.");
        console.log("ChangeEmail", nickName)
    };

    const handleOnSubmit = async () => {
        if(photo && photo.length >0) {
            const actualFile = photo[0];
            const formBody = new FormData();
            formBody.append("file", actualFile)
            await Axios.post('https://podspike.herokuapp.com/uploads', formBody)
            .then(response => {
                if(response.data.url) {
                    console.log("response.data.url", response.data.url);
                    setProfilePhoto(response.data.url);
                } else {
                    console.log('profilePhoto upload error', response.data.error);
                }
            })   
        }
        editProfileMutation();
    };
    return (
        <div className='mt-6 lg:w-full sm:w-max w-min '>
            <div className=''>
                <h3 className='text-2xl text-center font-bold'>프로필 수정</h3>
                <div className='font-bold grid gap-x-80 lg:grid-cols-3 '>
                    <div></div>
                <form
                    className='mt-4 flex flex-col gap-2'
                    onSubmit={handleSubmit(handleOnSubmit)}
                    >
                    <label>이메일</label>
                    <input
                        className="border font-bold border-gray-400 rounded-md py-2 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500"
                        ref={register({

                            required: "이메일을 입력해주세요",
                            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s  @"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })}
                        name="email"
                        type="email"
                        onChange={handleOnChangeEmail}
                        value={me?.me &&`${me.me.email}`}
                        size={15}
                        
                    />
                    
                    {errors.email?.message && <FormError error={errors.email?.message} />}
                    {errors.email?.type === "pattern" && <FormError error="이메일을 입력해주세요" />}
                    <label>별명</label>
                    <input
                        className="border font-bold border-gray-400 rounded-md py-2 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500"
                        ref={register({
                            
                        })}
                        name="nickName"
                        type="text"
                        size={15}
                        placeholder={`${me?.me.nickName}`}
                    />
                    {errors.nickName?.message && <FormError error={errors.nickName?.message} />}
                    {errors.nickName?.type === "pattern" && <FormError error="닉네임을 입력해주세요" />}
                    <label>비밀번호</label>            
                    <input
                        className="border font-bold border-gray-400 rounded-md py-2 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500"
                        ref={register({
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
                    <label>비밀번호 확인</label>  
                    <input
                        className='border font-bold border-gray-400 rounded-md py-2 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500'
                        ref={register({
                            validate: (v) => {
                                if(v !== getValues().password) {
                                    return "비밀번호가 일치하지 않습니다."
                                }
                                return true
                            }
                        })}
                        maxLength={16}
                        size={27}
                        name="passwordConfirm"
                        type="password"
                        placeholder="비밀번호확인"
                    />
                    {errors.passwordConfirm?.message && <FormError error={errors.passwordConfirm?.message} />}
                    <label>접근 권한</label>  
                    <select
                        className='border font-bold border-gray-400 rounded-md py-2 px-5 focus:ring-1 focus:ring-black focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-opacity-80 outline-none transition duration-500'
                        name="role"
                        ref={register({required: true})}
                    >
                        <option>Host</option>
                        <option>Listener</option>
                    {/* {Object.keys(UserRole).map((role, index) => {
                        <option key={index}>{role}</option>
                    })} */}
                    </select>
                    <label>프로필 사진</label>  
                    <input
                        className="border-2 border-gray-200 border-opacity-50 py-2"
                        ref={register()}
                        type="file"
                        name="photo"
                        accept='image/*'
                        size={27}
                    />
                    <Button
                        canClick={formState.isValid}
                        loading={loading} 
                        text="확인"
                    />
                    {editProfileResult?.editProfile.error && <FormError error={editProfileResult.editProfile.error} />}
                </form>
                <div></div>
                </div>
            </div>
        </div>
    )
}