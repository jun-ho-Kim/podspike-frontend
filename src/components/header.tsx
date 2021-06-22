import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { UserRole } from '../__generated__/globalTypes';
import { useMe } from './hooks/useMe';
import { SearchPodcastForm } from './searchPodcastForm';

interface HeaderPopupProps {
    dropDownRef: React.MutableRefObject<HTMLDivElement>;
    popup: boolean | null;
    isHost?: boolean | null;
}

const HeaderPopup: React.FC<HeaderPopupProps> = ({dropDownRef, popup, isHost}) => {
    const history = useHistory()
    const handleOnClick = () => {
        isLoggedInVar(false);
        localStorage.removeItem(LOCALSTORAGE_TOKEN);
        alert("로그아웃 되었습니다.");
        history.push("/");
    }
    return (
    <div
        ref={dropDownRef}
        className={`${popup === true ? 'block' : 'hidden'}`}
    >
        <div className='flex flex-col py-2 absolute top-6 left-12 bg-blue-300 z-10 mt-2 w-40  rounded-md'>

            <Link
                className='ml-2 hover:text-white' 
                to='/edit-profile'>
                ▪ 프로필 수정
            </Link>
            <span 
                onClick={handleOnClick}
                className='ml-2 hover:text-white cursor-pointer'>
                ▪ 로그아웃
            </span>
        </div>
        
    </div>

    )
};

interface IParam {
    id: string;
};

export const Header = () => {
    const dropDownRef = useRef<HTMLDivElement>(document.createElement("div"));
    const {pathname} = useLocation();
    const [popup, setPopup] = useState(false);
    const {data, loading, error} = useMe();
    const {id} = useParams<IParam>();
    const ParseId = parseInt(id);
    
    const handleOnPopupClick = () => {
        setPopup(!popup)
    }
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
                                <Link className='mr-4' to='/'>방송 관리</Link>
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
                            <div className='flex relative'
                                onClick={handleOnPopupClick}
                            >
                                <div 
                                className='w-8 h-8 bg-gray-300 bg-cover bg-center rounded-full mr-3'
                                style={{backgroundImage: `url(${data?.me.profilePhoto})`}}  
                                />
                                <div className=''>
                                    {data && !loading && <span>{data?.me.email}</span>}
                                    <span className='ml-2 text-lg font-medium'>{popup === true ? "▲" : "▼"}</span>
                                </div>
                            <li>
                                <HeaderPopup
                                    dropDownRef={dropDownRef}
                                    popup={popup}
                                    // isHost={data.me.role === UserRole.Listener}
                                />
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
                            <Link className='mr-4' to='/'>홈</Link>
                        </li>
                        <li className={`${pathname === '/rank' && 'text-blue-600 font-semibold'}`}>
                                <Link className='mr-4' to='/rank'>랭킹</Link>
                         </li>
                        {/* <li className={`${pathname === '/rank' && 'text-blue-600 font-semibold'}`}>
                            <Link to='/rank'>랭킹</Link>
                        </li> */}
                        <li className={`${pathname === '/categories' && 'text-blue-600 font-semibold' }`}>
                            <Link className='mr-4' to='/categories'>카테고리</Link>
                        </li>
                        {/* <li className={`${pathname === '/search' && 'text-blue-600 font-semibold'}`}>
                            <Link to='/search'>검색</Link>
                        </li> */}
                        <li className={`${pathname === '/subscription' && 'text-blue-600 font-semibold'}`}>
                            <Link className='mr-4' to='/subscription'>구독</Link>
                        </li>
                        <li>
                            <SearchPodcastForm />
                        </li>
                        <li>
                            <div className='flex relative cursor-pointer'
                                onClick={handleOnPopupClick}
                            >
                                <div 
                                className='w-8 h-8 bg-gray-300 bg-cover bg-center rounded-full mr-3'
                                style={{backgroundImage: `url(${data?.me.profilePhoto})`}}  
                                />
                                <div className=''>
                                    {data && !loading && <span>{data?.me.email}</span>}
                                    <span className='ml-2 text-lg font-medium'>{popup === true ? "▲" : "▼"}</span>
                                </div>
                            <li>
                                <HeaderPopup
                                    dropDownRef={dropDownRef}
                                    popup={popup}
                                    // isHost={data.me.role === UserRole.Listener}
                                />
                            </li>
                            </div>
                        </li>
                    </ul>
                </div>
            }
            </div>
    )
}