import { useState } from "react";

import Header from "./components/Header";
import Tasks from "./components/Tasks";


function App() {
  const [taskList, setTask] = useState([
    { id: 1, day: "4th Feb 2022", tags: ["JavaScript", "Pitfall"], title: "Title", code:"codey-codey = Code", text: "hello", table: [["Row1", "col1 Row 2"], ["Row2", "col2 row2"]] },
    { id: 2, day: "44th Feb 2022", tags: ["JavaScript", "Pitfall"], title: "Title", code:"codey-codey = Code", text: "eargerh", table: [["Row1", "col1 Row 2"], ["Row2", "col2 row2"]] },
    { id: 3, day: "444th Feb 2022", tags: ["JavaScript", "Pitfall"], title: "Title", code:"codey-codey = Code", text: "thrserthr", table: [["Row1", "col1 Row 2"], ["Row2", "col2 row2"]] },
  ]);
  
  return (
    <section className="container">
      <Header title="Task Tracker" />
      <Tasks taskList={taskList}/>
    </section>
  );
}

export default App;
