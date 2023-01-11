import { useState, createContext, useContext } from "react";

export default function DataContextProvider({ children }) {
  const data = useData();

  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
}

function useData() {
  const [data, setData] = useState(false);

  return {
    data,
    setData,
  };
}
const dataContext = createContext();

export function useDataContext() {
  return useContext(dataContext);
}
