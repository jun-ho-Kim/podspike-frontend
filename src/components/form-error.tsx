import React from 'react';

interface IFormProps {
    error: string;
};

export const FormError: React.FC<IFormProps> = ({error}) => <span className="text-red-500 text-xs font-bold">{error}</span>