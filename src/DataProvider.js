import { useState, createContext, useContext } from "react";

function useData(){

const [uiMode, setUiMode] = useState(null); //edit: true, tags: true
const [tags, setTags] = useState(null);
const [filters, setFilter] = useState(null); // active: true/false searchTitle: ""
const [tips, setTips] = useState(null);
const [inputForm, setInputForm] = useState(null);


return {
    uiMode, //edit: true, tags: true
    tags,
    filters,
    tips,
    inputForm,
};

}

export default function DataProvider({children}){
    const data = useData();

    return (
        <dataContext.Provider value={data}>
            {children}
        </dataContext.Provider>
    )

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
