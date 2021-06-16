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
                        className="w-32 h-32 bg-red-400 bg-center bg-cover rounded-lg" />
                    <h3>{title}</h3>
                    <p>{nickName}</p>
                </div>
            </div>
        </div>
    )
}