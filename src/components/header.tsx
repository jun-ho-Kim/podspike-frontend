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
        <div className='py-4 border-b-2 border-gray-400'>
            {data?.me.role === "Host" && 
                <div className='w-full sm:inline py-2 text-xl'>
                    <ul className='lg:grid grid-cols-3 sm:flex font-semibold'>
                        <div></div>
                        <div className='flex justify-center'>
                            <li className={`${pathname === '/' && 'text-blue-600 font-semibold'}`}>
                                <Link className='mr-4' to='/'>홈</Link>
                            </li>
                            {/* <li className={`${pathname === '/rank' && 'text-blue-600 font-semibold'}`}>
                                <Link to='/     rank'>랭킹</Link>
                            </li> */}
                            <li className={`${pathname === '/categories' && 'text-blue-600 font-semibold'}`}>
                                <Link className='mr-4' to='/categories'>카테고리</Link>
                            </li>
                            <li className={`${pathname === '/create-podcast' && 'text-blue-600 font-semibold'}`}>
                                <Link className='mr-3' to="create-podcast">방송 생성</Link>
                            </li>
                            {/* <li className={`${pathname === '/search' && 'text-blue-600 font-semibold'}`}>
                                <Link to='/search'>검색</Link>
                            </li> */}
                            {/* <li className={`${pathname === '/subscription' && 'text-blue-600 font-semibold'}`}>
                                <Link className='mr-4' to='/subscription'>구독</Link>
                            </li> */}
                            <li>
                                {/* <SearchPodcastForm /> */}
                            </li>

                        </div>
                        <li>
                            <div className='flex justify-end'>
                                <div 
                                className='w-8 h-8 bg-gray-300 bg-cover bg-center rounded-full mr-3'
                                style={{backgroundImage: `url(${data?.me.profilePhoto})`}}  
                                />
                                <span>{data && !loading && <span>{data?.me.email}</span>}</span>
                                <li>
                                    {/* <Link className='mr-3' to="create-podcast">방송 생성</Link> */}
                                    {/* <Link to={`/${ParseId}/update-podcast}`}>방송 수정</Link> */}
                                </li>
                            </div>
                        </li>
                    </ul>
                </div>
            }
            {data?.me.role === "Listener" && 
            <div className='w-full md:inline-block sm:hidden hidden py-4 px-40 text-xl'>
                    <ul className='flex justify-around font-semibold'>
                        <li className={`${pathname === '/' && 'text-blue-600 font-semibold'}`}>
                            <Link to='/'>홈</Link>
                        </li>
                        {/* <li className={`${pathname === '/rank' && 'text-blue-600 font-semibold'}`}>
                            <Link to='/rank'>랭킹</Link>
                        </li> */}
                        <li className={`${pathname === '/categories' && 'text-blue-600 font-semibold' }`}>
                            <Link to='/categories'>카테고리</Link>
                        </li>
                        {/* <li className={`${pathname === '/search' && 'text-blue-600 font-semibold'}`}>
                            <Link to='/search'>검색</Link>
                        </li> */}
                        <li className={`${pathname === '/subscription' && 'text-blue-600 font-semibold'}`}>
                            <Link to='/subscription'>구독</Link>
                        </li>
                        <li>
                            <SearchPodcastForm />
                        </li>
                        <li>
                            <div className='flex '>
                                <div 
                                className='w-8 h-8 bg-gray-300 bg-cover bg-center rounded-full mr-3'
                                style={{backgroundImage: `url(${data?.me.profilePhoto})`}}  
                                />
                                <span>{data && !loading && <span>{data?.me.email}</span>}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            }
            </div>
    )
}