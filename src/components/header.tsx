import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useMe } from './hooks/useMe';
import { SearchPodcastForm } from './searchPodcastForm';

interface IParam {
    id: string;
}

export const Header = () => {
    const {pathname} = useLocation();
    const {data, loading, error} = useMe();
    const {id} = useParams<IParam>();
    const ParseId = parseInt(id);
;    useEffect(() => {
        console.log("me", data);
    }, [])
    return (
        <div className='w-screen py-4 border-b-2 border-gray-400'>
            <div className='w-full md:block sm:hidden hidden py-4 px-40 text-xl'>
                <ul className='flex justify-around font-semibold'>
                    <li className={`${pathname === '/' && 'text-blue-600 font-semibold'}`}>
                        <Link to='/'>홈</Link>
                    </li>
                    <li className={`${pathname === '/rank' && 'text-blue-600 font-semibold'}`}>
                        <Link to='/rank'>랭킹</Link>
                    </li>
                    <li className={`${pathname === '/categories' && 'text-blue-600 font-semibold' }`}>
                        <Link to='/categories'>카테고리</Link>
                    </li>
                    <li className={`${pathname === '/search' && 'text-blue-600 font-semibold'}`}>
                        <Link to='/search'>검색</Link>
                    </li>
                    <li className={`${pathname === '/subscription' && 'text-blue-600 font-semibold'}`}>
                        <Link to='/subscription'>구독</Link>
                    </li>
                    <li>
                        <SearchPodcastForm />
                    </li>
                    <li>
                        {data && !loading && <span>{data?.me.email}</span>}
                    </li>
                    <li>
                        <Link to="create-podcast">방송 생성</Link>
                        <Link to={`/${ParseId}/update-podcast}`}>방송 수정</Link>
                    </li>
                </ul>
            </div>

            </div>
    )
}