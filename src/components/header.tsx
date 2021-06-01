import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMe } from './hooks/useMe';

export const Header = () => {
    const {pathname} = useLocation();
    const {data, loading, error} = useMe();
    useEffect(() => {
        console.log("me", data);
    }, [])
    return (
        <div className='w-screen py-4 border-b-2 border-gray-400'>
            <div className='w-full md:block sm:hidden hidden py-4 px-40 text-xl'>
                <ul className='flex justify-around'>
                    <li className={`${pathname === '/' && 'text-blue-600 font-semibold'}`}>
                        <Link to='/'>홈</Link>
                    </li>
                    <li className={`${pathname === '/rank' && 'text-blue-600 font-semibold'}`}>
                        <Link to='/rank'>랭킹</Link>
                    </li>
                    <li>
                        <Link to='/categories'>카테고리</Link>
                    </li>
                    <li>
                        <Link to='/search'>검색</Link>
                    </li>
                    <li>
                        <Link to='/subcription'>구독</Link>
                    </li>
                    <li>
                        {data && !loading && <span>{data?.me.email}</span>}
                    </li>
                </ul>
            </div>

            </div>
    )
}