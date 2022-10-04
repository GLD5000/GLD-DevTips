import { useState } from "react";

import Header from "./components/Header";
import Tips from "./components/Tips";


function App() {
  const [tipList, setTip] = useState([
    { id: 1, day: "4th Feb 2022", tags: ["JavaScript", "Pitfall"], title: "Title", code:"codey-codey = Code", text: "hello", table: [["H1", "h2", "h3"], ["r1c1", "r1c2", "r1c3", "r1c4"]] },
    { id: 2, day: "44th Feb 2022", tags: ["JavaScript", "Pitfall"], title: "Title", code:"codey-codey = Code", text: "eargerh", table: [["Row1", "col1 Row 2"], ["Row2", "col2 row2"]] },
    { id: 3, day: "444th Feb 2022", tags: ["JavaScript", "Pitfall"], title: "Title", code:"codey-codey = Code", text: "thrserthr", table: [["Row1", "col1 Row 2"], ["Row2", "col2 row2"]] },
  ]);
  
  return (
    <section className="container">
      <Header title="Tip Tracker" />
      <Tips tipList={tipList}/>
    </section>
  );
}

export default App;
