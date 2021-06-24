import React from 'react';

interface IPodcastList {
    title: string;
    nickName: string | null;
    thumbnail: string | null;
}


export const PodcastList: React.FC<IPodcastList> = ({title, nickName, thumbnail}) => {
    return (
        <div className='mt-6  flex justify-center items-center'>
            <div className=''>
                <div>
                    <div 
                        style={{backgroundImage: `url(${thumbnail})`}}
                        className={`w-32 h-32 ${thumbnail=== undefined && 'bg-red-400'} bg-center bg-cover rounded-lg`} />
                    <h3 className='text-lg font-medium'>{title && title.length >16 ? `${title.substring(0,15)}...`: title}</h3>
                    <p className='text-xs text-gray-600'>{nickName}</p>
                </div>
            </div>
        </div>
    )
}