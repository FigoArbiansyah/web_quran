import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ placeholder, onChangeSearch }) => (
  <form>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full py-2 px-4 bg-slate-100 rounded-full focus:outline focus:outline-emerald-500 transition-all ease duration-300 placeholder:text-slate-400 placeholder:font-light text-slate-600"
      onChange={onChangeSearch}
    />
  </form>
);

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChangeSearch: PropTypes.func.isRequired,
};

export default SearchBar;
