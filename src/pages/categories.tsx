import { useMutation, gql, useQuery, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from 'react';
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
    }, [updateCategory])
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
        <>
            <div>
                <div className="flex mt-12">
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
                    <div className='mt-12 ml-6'>
                    {data?.categories.podcasts && data.categories.podcasts.map((podcast: any, index: number) => (
                        <span className="w-max h-screen mr-3">{podcast.title}</span>
                    ))}
                    </div>
                    )}
            </div>
    </>
    )
}