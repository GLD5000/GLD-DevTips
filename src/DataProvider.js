import { useState, useEffect, createContext, useContext } from "react";
import { getTagsFirestore, getTipsFirestore} from "./firestore";

function useData() {
  const [uiMode, setUiMode] = useState(() => {
    return { edit: false, tags: false };
  });
  const [filters, setFilter] = useState(() => {
      return { active: false, searchTitle: undefined };
    });
  const [tags, setTags] = useState(null);
  const [tips, setTips] = useState(null);
  const [inputForm, setInputForm] = useState(null);


  useEffect(() => {
    let ignore = false;
    getTagsFirestore().then((result) => {
      if (!ignore) {
        console.log(result);
        setTags(result);
      }
    });
    getTipsFirestore().then((result) => {
      if (!ignore) {
        console.log(result);
        setTips(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);


  return {
    uiMode, //edit: true, tags: true
    tags,
    filters,
    tips,
    inputForm,
  };
}

export default function DataProvider({ children }) {
  const data = useData();

  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
}
const dataContext = createContext({
  // shape of context
  uiMode: null, //edit: true, tags: true
  tags: null,
  filters: null,
  tips: null,
  inputForm: null,
  tagClick: async () => {},
  searchChange: async () => {},
  previewTip: async () => {},
  saveTip: async () => {},
  editTip: async () => {},
  deleteTip: async () => {},
});

export const useDataContext = () => useContext(dataContext); // custom hook
