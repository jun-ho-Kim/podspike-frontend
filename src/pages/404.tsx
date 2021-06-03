import React from 'react';
import { Link } from 'react-router-dom';

export const NotFount = () => (
    <div>
        <h2>Page Not Found</h2>
        <h4>존재하지 않는 페이지 입니다.</h4>
        <Link to='/'>
            홈으로 돌아가기
        </Link>
    </div>

)
