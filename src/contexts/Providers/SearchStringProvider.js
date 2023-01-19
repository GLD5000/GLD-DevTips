import { useState, createContext, useContext } from "react";
function useData() {
  const [searchString, setSearchString] = useState(getTitleFromUrl());
  return {
    searchString,
    setSearchString,
  };
}
export default function SearchStringProvider({ children }) {
  const data = useData();
  console.group(`data`);
  console.log(data);
  console.groupEnd();
  return <SearchString.Provider value={data}>{children}</SearchString.Provider>;
}
const SearchString = createContext();

export const useSearchStringContext = () => useContext(SearchString); // custom hook

function getTitleFromUrl() {
  const search = window.location.search;
  if (search === "") return null;
  const searchObject = new URLSearchParams(search);
  const searchFromUrl = searchObject.get("title");
  return searchFromUrl;
}

