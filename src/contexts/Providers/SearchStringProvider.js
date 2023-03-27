import { useState, createContext, useContext } from 'react';

function useData() {
  const [searchString, setSearchString] = useState(getTitleFromUrl());
  return {
    searchString,
    setSearchString,
  };
}
export default function SearchStringProvider({ children }) {
  const data = useData();
  return <SearchString.Provider value={data}>{children}</SearchString.Provider>;
}
const SearchString = createContext();

export const useSearchStringContext = () => useContext(SearchString); // custom hook

function getTitleFromUrl() {
  const { search } = window.location;
  if (search === '') return '';
  const searchObject = new URLSearchParams(search);
  const searchFromUrl = searchObject.get('title')?.replaceAll(/[ ]+/g, ' ');
  return searchFromUrl;
}
