import { useState } from "react";

import Header from "./components/Header";
import Tasks from "./components/Tasks";


function App() {
  const [taskList, setTask] = useState([
    { id: 1, text: "hello", day: "4th Feb 2022", reminder: true },
    { id: 2, text: "eargerh", day: "44th Feb 2022", reminder: true },
    { id: 3, text: "thrserthr", day: "444th Feb 2022", reminder: true },
  ]);
  
  return (
    <section className="container">
      <Header title="Task Tracker" />
      <Tasks taskList={taskList}/>
    </section>
  );
}

export default App;
