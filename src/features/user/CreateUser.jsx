import { useState } from 'react';
import Button from '../../ui/Button';
import { Link, redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from './userSlice';

function CreateUser() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if(!username) throw new Error('Username must be provided')
    dispatch(updateUser({payload: username}))
  }

  return (
    <form onSubmit={handleSubmit} className='transition-all'>
      <p className="mb-2 text-sm sm:mb-4 sm:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='input mb-6'
      />

      {username !== '' && (
          <Link to={'menu'}><Button>Start Ordering</Button></Link>
      )}
    </form>
  );
}

export default CreateUser;
