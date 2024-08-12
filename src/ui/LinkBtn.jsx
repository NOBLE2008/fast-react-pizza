import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LinkBtn({ children, to }) {
    const navigate = useNavigate()
  if (to === '-1')
    return (
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-500 hover:text-blue-600 hover:underline sm:text-base"
      >
        &larr; Go back
      </button>
    );
  return <Link to={to}>{children}</Link>;
}
