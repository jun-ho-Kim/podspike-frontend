import React from 'react';
import { Link } from 'react-router-dom';


export const Footer = () => {
    return (
        <div className=' mt-15 mb-2 flex flex-col justify-center items-center w-full border-t-2 text-gray-400 border-gray-300'>
            <div className='py-4'>
               <span className='mx-5'>Junho-Kim</span>  <span className='border-l-2 pl-2'>이메일 wnsgh5049@naver.com</span>
            </div>
            <div className='flex'>
                <a 
                    className='text-xl border-r-2 border-gray-300 px-10'
                    href={'https://github.com/jun-ho-Kim'} target='_blank'>
                        <i className="fab fa-github"></i>
                </a>
                <a 
                    className='text-xl border-r-2 border-gray-300 px-10'
                    href={'https://www.notion.so/JunhoKim-s-Profile-180d41d07b0e4af18341fa480d18779a'} target='_blank'>
                    <div
                        className="bg-center bg-cover mt-1 w-7 h-7 opacity-70" 
                        style={{backgroundImage: `url(${'https://podspike.s3.ap-northeast-2.amazonaws.com/notionImage.png'})`}} />

                </a>
                <a 
                    className='text-xl border-r-2 border-gray-300 px-10'
                    href={'https://today-is-hoho.tistory.com/'} target='_blank'>
                        <i className="fas fa-blog"></i>
                </a>                
            </div>
        </div>
    )
}