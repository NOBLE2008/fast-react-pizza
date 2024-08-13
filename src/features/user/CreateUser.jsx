import { useState } from 'react';
import Button from '../../ui/Button';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from './userSlice';

function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || username.split('').length < 4) return;
    dispatch(updateUser(username));
    return navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit} className="transition-all">
      <p className="mb-2 text-sm sm:mb-4 sm:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-6"
      />

      {username && <Button>Start Ordering</Button>}
    </form>
  );
}

export default CreateUser;
