import React from 'react';

interface IPodcastList {
    title: string;
    nickName: string | null;
    thumbnail: string | null;
}


export const PodcastList: React.FC<IPodcastList> = ({title, nickName, thumbnail}) => {
    return (
        <div className='mt-6 flex justify-center items-center border-gray-200 border-b-2'>
            <div className='flex flex-col justify-center items-center'>
                    <div 
                        style={{backgroundImage: `url(${thumbnail})`}}
                        className={`w-32 h-32 my-1 ${thumbnail=== undefined && 'bg-red-400'} bg-center bg-cover rounded-lg`} />
                    <h3 className='w-48 text-base text-center font-medium'>{title && title.length >10 ? `${title.substring(0,10)}...`: title}</h3>
                    <p className='text-xs text-gray-600 mb-3'>{nickName}</p>
                </div>
        </div>
    )
}