import { useState } from "react";

import Header from "./components/header/Header";
import Tips from "./components/tips/Tips";


function App() {
  const [tipList, setTip] = useState([
    { "id": 1,
     "date": "11th Oct 2022",
     "tags": ["Github", "Bash", "Beginner"],
     "title": "Cloning a Repo from Github",
      "sections": [{
      "type": "code",
      "content": `git clone [Your Repo Url copied from GitHub]`},
      {"type": "text",
       "content": `This makes a linked copy of a repo from your Github Account to your computer.

The above command will clone or copy the repo to your default path.`},
{"type": "hint",
       "content": `Within VSCode you can change the default path setting in your preferences by searching 'Git Clone' and editing your 'settings.json'`},
       {"type": "text",
       "content": `You can open the cloned repo within VSCode by using the open folder option from the 'File' menu.`}
        ]
 
    }, 
    { "id": 2,
     "date": "4th Feb 2022",
     "tags": ["JavaScript", "How-To"],
     "title": "Crockford Objects",
      "sections": [{
      "type": "code",
      "content": `function createObject(parameterA, parameterB) {
  
  function concatenateValues() {
    return \`\${parameterA}\${parameterB}\`;
  }
      
  return {
    parameterA,
    parameterB,
    concatenateValues,
  };
}
      
const object = createObject("A", "B");
      `},
      {"type": "hint", "content": "You can also add 'Object.freeze' to your return object to make it immutable!"},
      {"type": "code", "content": `return Object.freeze({
  parameterA,
  parameterB,
  concatenateValues,
});`}
      ]
    }, 
    { "id": 3,
     "date": "4th Feb 2022",
     "tags": ["JavaScript", "Nomenclature"],
     "title": "Parameters Vs Arguments",
      "sections": [{"section-title": "Parameters",
      "type": "text",
      "content": "These are the names for values passed into a function."},
      {"section-title": "Arguments",
      "type": "text",
      "content": "These are the actual values passed into a function."},
      {"type": "table",
       "content": [["Parameter", "Argument", "Variable", "Constant"],
        ["Name / Placeholder for values of a function.", "Actual value given to a function.", "A named reference to a value that can change.", "A value that cannot change."]]}]
    }
  ]);
  
  return (
    <section className="container">
      <Header title="Tip Town 5000" />
    <section className="tip-container">
      <Tips tipList={tipList}/>
    </section>

    </section>

  );
}

export default App;
