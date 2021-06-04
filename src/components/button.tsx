import React from 'react';

interface IButtonProps {
    loading: boolean;
    text: string;
    canClick: boolean;
}

export const Button: React.FC<IButtonProps> = ({loading, text, canClick}) => 
    <button
        role="button"
        className={`text-base font-extrabold focus:outline-none hover:bg-blue-600 transition-colors duration-500 px-6 py-4 rounded-md 
        ${canClick ? 'bg-pink-400 text-yellow-300' : 'bg-gray-300 text-white'}`}
    >
        {loading ? "Loading..." : text}
    </button>
