import React from 'react';
import { isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';

export const LoggedInRouter = () => {
    const handleOnClick = () => {
        isLoggedInVar(false);
        localStorage.removeItem(LOCALSTORAGE_TOKEN);
    }
    return (
        <div className={'min-h-screen flex items-center justify-center'}>
            <span onClick={handleOnClick}
            className={"bg-blue-100 text-4xl"}>
                Logged out
            </span>
        </div>
    )



}