import React, { useState, useEffect } from "react";
import axios from "axios";
import { DisplayResult, SearchData } from "@/types";
import { isNum, sortDisplayResults } from "../../utils";
import SearchList from "../SearchList/SearchList";

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [results, setResults] = useState<SearchData | null>(null);
  const [display, setDisplay] = useState<DisplayResult[] | []>([]);
  const [showDisplay, setShowDisplay] = useState<boolean>(false);

  useEffect(() => {
    if (searchText) {
      const makeSearch = setTimeout(() => {
        const data = axios
          .get(`/api/fullTextSearch/${searchText}`)
          .then((res) => setResults(res.data));
      }, 500);
      return () => clearTimeout(makeSearch);
    }
  }, [searchText]);

  useEffect(() => {
    if (searchText === "") {
      setResults(null);
      close();
    }

    if (results) {
      const toSort = {
        isNum: isNum(searchText),
        results: results,
      };

      const toDisplay = sortDisplayResults(toSort);

      if (toDisplay.length) {
        setDisplay(toDisplay);
        open();
      }
    }
  }, [results, searchText]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  const open = () => {
    setShowDisplay(true);
  };
    
  const close = () => {
    setShowDisplay(false);
  };

  const outsideClick = () => {
    close();
    setResults(null);
  };

  return (
    <div
      style={{
        position: "absolute",
        right: "10%",
        top: "2.5%",
        backgroundColor: "red",
      }}
    >
      <input
        type="text"
        name="search"
        placeholder="Placeholder text"
        onChange={handleChange}
        value={searchText}
      />

      {display.length > 0
        ? showDisplay && (
            <SearchList outsideClick={outsideClick} display={display} />
          )
        : null}
    </div>
  );
};

export default Search;
