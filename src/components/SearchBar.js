import React from "react";
import search_logo from "../images/search_black_24dp.svg";

const SearchBar = ({
  handleSearchSubmit,
  searchInputValue,
  handleSearchValueChange,
}) => {
  return (
    <form className="box-container" onSubmit={handleSearchSubmit}>
      <table className="elements-container">
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                placeholder="Search book"
                className="search-input"
                value={searchInputValue}
                onChange={handleSearchValueChange}
              />
            </td>

            <td>
              <button type="submit" className="search-button">
                <img src={search_logo} alt="search" className="search-icon" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default SearchBar;
