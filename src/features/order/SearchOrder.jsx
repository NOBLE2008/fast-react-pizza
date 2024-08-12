import React, { useState } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import Loader from '../../ui/Loader';

function SearchOrder() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const [query, setQuery] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/order/${query}`);
  };
  const handleChangeSearch = (e) => {
    setQuery(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      {isLoading && <Loader />}
      <input
        type="text"
        placeholder="search order #"
        onChange={handleChangeSearch}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-sm focus:w-36 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
