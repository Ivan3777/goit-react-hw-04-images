import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(query);
  };


return (
  <header className="Searchbar">
    <form className="SearchForm" onSubmit={handleSubmit}>
      <button className="SearchForm-button" type="submit">
        Search
      </button>

      <input
        className="SearchForm-input"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Find some pictures"
        name="query"
        value={query}
        onChange={handleChange}
      />
    </form>
  </header>
);
}
