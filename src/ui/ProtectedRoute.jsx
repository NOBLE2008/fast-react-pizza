import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const username = useSelector((state) => {
    return state.user.username;
  });
  const navigate = useNavigate()
  useEffect(() => {
    if (username === '') {
      navigate('/', {replace: true})
    }
  })
  return children;
}
