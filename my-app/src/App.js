import { useState } from "react";

import Header from "./components/Header";
import Tips from "./components/Tips";


function App() {
  const [tipList, setTip] = useState([
    { "id": 1,
     "date": "4th Feb 2022",
     "tags": ["JavaScript", "Pitfall"],
     "title": "Title",
      "sections": [{"section-title": "optional title",
      "type": "code",
      "content": "string"},
      {"type": "table",
       "content": [["array", "of", "strings"],
        ["array", "of", "strings"]]}]
    }, 
    { "id": 2,
     "date": "4th Feb 2022",
     "tags": ["JavaScript", "Pitfall"],
     "title": "Title",
      "sections": [{"section-title": "optional title",
      "type": "code",
      "content": "string"},
      {"type": "table",
       "content": [["array", "of", "strings"],
        ["array", "of", "strings"]]}]
    }, 
    { "id": 3,
     "date": "4th Feb 2022",
     "tags": ["JavaScript", "Pitfall"],
     "title": "Title",
      "sections": [{"section-title": "optional title",
      "type": "code",
      "content": "string"},
      {"type": "table",
       "content": [["array", "of", "strings"],
        ["array", "of", "strings"]]}]
    }
  ]);
  
  return (
    <section className="container">
      <Header title="Tip Tracker" />
      <Tips tipList={tipList}/>
    </section>
  );
}

export default App;
