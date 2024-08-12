import { useState } from 'react';
import Button from '../../ui/Button';
import { Link, redirect } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
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
        className='input'
      />

      {username !== '' && (
          <Link to={'menu'}><Button>Start Ordering</Button></Link>
      )}
    </form>
  );
}

export default CreateUser;
