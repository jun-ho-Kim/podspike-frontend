import { useMutation, gql, useQuery, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { categories } from "../__generated__/categories";

export const categoryList = [
    "교양",
    "예능",
    "시사",
    "경제",
    "어학",
    "도서",
    "대중문화",
    "스포츠/레저",
    "방송국 다시듣기",
    "종교",
    "뮤직"
];

const CATEGORIES_QUERY = gql`
    query categories($input: CategoriesInput!) {
        categories(input: $input) {
            ok
            error
            totalPage
            totalResults
            currentPage
            currentCount
            categories
            podcasts {
                id
                title
                thumbnail
                description
                updateAt
                subscriber {
                    id
                    nickName
                }
            }
        }
    }
`;
export const Categories = () => {
    const [currentCategory, setCurrentCategory] = useState("교양");
    const [updateCategory, setUpdateCategory] = useState(false);
    // const [podcasts, setPodcasts] = useState([])

    const onCompleted = (data: categories) => {
        const { 
            categories: {podcasts} 
        } = data;
        console.log("completed data" ,data);
    }

    const [categoriesQuery, {data, loading, error}] = useLazyQuery(CATEGORIES_QUERY, {
        onCompleted,
        variables: {
            input: {
                page: 1,
                takeNumber: 10,
                category: currentCategory,
            }
        }        
    });

    useEffect(() => {
            categoriesQuery();
    }, [currentCategory])
    console.log("current cate", currentCategory)
    console.log("current data", data)

    const handleOnClick = (event:any) => {
        event.preventDefault();
        setUpdateCategory(true);
        try {
            setCurrentCategory(event.target.innerText);
        } catch(error) {
            console.log("error", error);
        } finally {
            setUpdateCategory(false);
        }
    }
    return (
            <div className='h-screen sm:max-w-sm lg:max-w-full flex flex-col items-center'>
                <h1 className='text-3xl font-bold mt-6'>카테고리</h1>
                <div className=" flex mt-12 lg:flex-row sm:flex-col">
                {categoryList.map((category, index) => 
                    <div
                    className=""
                    >
                        <span 
                            onClick={handleOnClick} 
                            className={`${currentCategory === category && 'bg-blue-400 text-white'} ml-5 px-2 py-1 bg-gray-200 text-black rounded-md hover:bg-blue-400 #1FA1EB`}>{category}</span>
                    </div>
                    
                    )}
                </div>
                    {loading ? "Loading... " : (
                <div className='flex flex-col items-start'>
                    <span className='mt-12 text-lg    flex font-semibold'>채널 
                        <p className='text-blue-400 ml-2'> {data?.categories.podcasts?.length}</p>
                    </span>
                    <div className='mt-4 grid lg:grid-cols-2 gap-x-44 gap-y-6 sm:flex-col '>
                    {data?.categories.podcasts && data.categories.podcasts.map((podcast, index) => (
                        <div className='flex'>
                            <Link 
                                className="flex justify-items-stretch" 
                                to={`/${podcast.id}`}>
                                <div 
                                    className='w-24 h-24 bg-center bg-cover rounded-lg'
                                    style={{backgroundImage: `url(${podcast.thumbnail})`}}
                                />
                                <div className="ml-7 flex flex-col">
                                    <h3 className="text-lg font-semibold">{podcast.title}</h3>
                                    <p className="text-sm text-gray-400">
                                        {podcast.description && podcast.description.length >35 ? 
                                        `${podcast.description.substring(0,35)}...` : podcast.description}
                                    </p>
                                    <div className='flex'>
                                        <span 
                                            className='mt-1 text-sm font-medium text-gray-700'
                                        >{podcast.updateAt.substring(0,10).replace(/-/g, ".")}</span>: 
                                        <p></p>
                                        <p className='text-gray-500 text-sm mt-1 ml-2'>구독자 <span className='text-gray-900'>{`${podcast.subscriber?.length ? podcast.subscriber?.length: 0}`}</span></p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                    </div>
                    )}
            </div>
    )
}