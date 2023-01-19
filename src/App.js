import {  useState } from "react";
import Header from "./components/header/Header";
import Tips from "./components/tips/Tips";
import AddTip from "./components/header/AddTip/AddTip";
import Filters from "./components/header/Filters";

import getRandomColour from "./utilities/randomColour";
import AutoTextColour from "./utilities/autoTextColour";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { doc, getDoc } from "firebase/firestore";

import CombinedProviders from "./contexts/CombinedProviders";
import DataProvider from "./DataProvider";

import {
  addTipToFirestore as addTipToDb,
  addTagToFirestore as addTagToDb,
} from "./firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBJ7I6lUNnmKkJd60Gyoox-QfzO5wKdjCU",
  authDomain: "devtips-c1b63.firebaseapp.com",
  projectId: "devtips-c1b63",
  storageBucket: "devtips-c1b63.appspot.com",
  messagingSenderId: "616417597533",
  appId: "1:616417597533:web:445aabc894ece7a57495b4",
  measurementId: "G-D9GBBQW1S0",
};
let gotDbData = false;
let gotDbTagColours;
let updatedTagState = false;
export const tagColours = {
  javascript: {
    name: "Javascript",
    backgroundColour: "#EAD41C",
    textColour: "#000000",
  },
  github: {
    name: "GitHub",
    backgroundColour: "#3B6FAB",
    textColour: "#ffffff",
  },
  vscode: {
    name: "VSCode",
    backgroundColour: "#48AAEB",
    textColour: "#000000",
  },
};
const exampleObject = {
  "0001": {
    id: "0001",
    date: "11th Oct 2022",
    tags: ["Github", "Bash", "Beginner", "VSCode"],
    title: "How to clone a Repo from Github",
    sections: [
      {
        type: "code",
        content: `git clone [Your Repo Url copied from GitHub]`,
      },
      {
        type: "text",
        content: `##This makes a linked copy of a repo from your Github Account to your computer.
        
        The above command will clone or copy the repo to your default path.`,
      },
      {
        type: "hint",
        content: `Within VSCode you can change the default path setting in your preferences by searching 'Git Clone' and editing your 'settings.json'`,
      },
      {
        type: "text",
        content: `#You can open the cloned repo within VSCode by using the open folder option from the 'File' menu.`,
      },
      {
        type: "text",
        content: `#[Tester T](ext Containing a {link}[**Bold** _**bolditalic**_ of link](https://www.google.co.uk/){link} {link}[Text of link](https://www.google.com/){link}.
        
        n. ordered  list item
        n. ordered list item
        n. ordered list item
        - bullet points
        - bullet points
        - bullet points`,
      },
    ],
  },
  "0002": {
    id: "0002",
    date: "4th Feb 2022",
    tags: ["JavaScript", "How-To"],
    title: "Crockford Objects",
    sections: [
      {
        title: "Test Title",

        type: "code",
        content: `function createObject(parameterA, parameterB) {
          
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
`,
      },
      {
        type: "hint",
        content:
          "You can also add 'Object.freeze' to your return object to make it immutable!",
      },
      {
        type: "code",
        content: `return Object.freeze({
  parameterA,
  parameterB,
  concatenateValues,
});`,
      },
    ],
  },
};

// Initialize Firebase//delete
const app = initializeApp(firebaseConfig); //delete
//Firestore//delete
const database = getFirestore(app); //delete
const tipsDocRef = doc(database, "devtips", "tips"); //delete
const tagsDocRef = doc(database, "devtips", "tags"); //delete

// async function addTipToDb(object) {//delete

//   try {
//     await updateDoc(tipsDocRef, {
//       [object.id]: object,
//     });
//     const gotDoc = await getDoc(tipsDocRef);

//     Object.entries(tagColours).forEach((tag) => {
//       if (tag[1].fromDb !== true) addTagToDb(tag[0], tag[1]);
//     });
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }
// async function addTagToDb(lowerCaseTagName, tag) {//delete
//   try {
//     await updateDoc(tagsDocRef, {
//       [lowerCaseTagName]: tag,
//     });
//     const gotDoc = await getDoc(tagsDocRef);

//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }
const tagsObject = {};

async function tagHexLookup(tag, tagColours) {
  const lowerCaseTagName = tag.toLowerCase();
  const tagNotPresent = tagColours[lowerCaseTagName] === undefined;

  if (tagNotPresent) {
    const backgroundColour = getRandomColour();
    const textColour = AutoTextColour(backgroundColour);
    tagColours[lowerCaseTagName] = {
      name: tag,
      backgroundColour: backgroundColour,
      textColour: textColour,
    };
    addTagToDb(lowerCaseTagName, tagColours[lowerCaseTagName]);
  }
  return tagColours;
}
async function getDocDataFromDb(docRef) {
  //delete
  const gotDoc = await getDoc(docRef);
  const dataObject = await gotDoc.data();
  return dataObject;
}
const inputFormStarter = {
  title: null,
  id: null,
  sections: [{ type: "text", content: "" }],
  tags: [],
  date: null,
};
function initialiseInputFormState(inputFormStarter, setInputFormState) {
  setInputFormState(() => inputFormStarter);
  //Set all fields of InputFormState
}
function padIdNumber(number) {
  return number.toString(10).padStart(4, "0");
}

function makeNewTipId(tipList) {
  const number = Object.values(tipList).length + 1;
  const paddedNumber = padIdNumber(number);
  return paddedNumber;
}
const url = window.location.search;
const urlObject = new URLSearchParams(url);
const tagsFromUrl = urlObject.getAll("tags").map((x) => x.toLowerCase());
export default function App() {
  const [inputFormState, setInputFormState] = useState(() => inputFormStarter);
  function addFieldToInputFormState(key, value) {
    setInputFormState((object) => {
      const newObject = { ...object };
      newObject[key] = value;
      return newObject;
    });
  }
  function addObjectToInputFormState(object) {
    // console.group(`object`);

    // console.groupEnd();
    if (object === null) {
      initialiseInputFormState(inputFormStarter, setInputFormState);
      return;
    }
    // setInputFormState(() => null);
    // setShowAddTipForm(false);
    setInputFormState(() => {
      const newObject = { ...object };
      newObject.tags = [...object.tags];
      newObject.sections = object.sections.map((x) => {
        return { ...x };
      });
      return newObject;
    });
  }

  const [tipList, setTip] = useState(exampleObject);
  const [showAddTipForm, setShowAddTipForm] = useState(() => false);
  async function getDbData() {
    const tipsObject = await getDocDataFromDb(tipsDocRef);
    setTip(() => tipsObject);

    const newTagColours = await getDocDataFromDb(tagsDocRef);
    Object.entries(newTagColours).forEach((entry) => {
      tagColours[entry[0]] = { ...entry[1], fromDb: true };
    });
    gotDbTagColours = true;

    gotDbData = true;
  }
  if (gotDbData === false) {
    getDbData();
  }

  const [tagState, setTagState] = useState(tagsObject); // Tip init functions only run once
  function getTags(updatedTagState) {
    Object.keys(tagColours)
      .sort()
      .forEach((key) => {
        tagsObject[tagColours[key].name] = tagsFromUrl.includes(key)
          ? "active"
          : "visible";
      });
    updatedTagState = true;
  }
  if (gotDbTagColours && Object.keys(tagState).length < 10) {
    getTags(updatedTagState);

    setTagState((oldState) => {
      return { ...tagsObject };
    });
  }

  const tagListAll = Object.keys(tagState);
  function mapTagColours(tagColours) {
    tagListAll.forEach((tag) => {
      tagHexLookup(tag, tagColours);
    });
    gotDbTagColours = false;
    return tagColours;
  }
  if (gotDbTagColours) {
    mapTagColours(tagColours);
  }
  const newTipId = makeNewTipId(tipList);




  async function editTip(e) {
    const id = e.target.id;
    const tipObject = tipList[id];
    addObjectToInputFormState(tipObject);
    setShowAddTipForm(true);
    clearTags();
  }

  function addNewObjectToTips(newObject) {
    setTip((object) => {
      const copyObject = { ...object };
      copyObject[newObject.id] = newObject;
      return copyObject;
    });
    newObject.tags.forEach((tag) => {
      if (tagState[tag] === undefined)
        setTagState((object) => {
          return { ...object, [tag]: "visible" };
        });
    });
  }
  const [filterExpanded, setFilterExpanded] = useState(() => false);

  function clearTags() {
    setTagState((old) => {
      const newObject = { ...old };
      Object.keys(newObject).forEach((key) => {
        newObject[key] = "visible";
      });
      return newObject;
    });
  }

  function setTagStateFromTip(tag) {
    const newValue = tagState[tag] === "active" ? "visible" : "active";
    setTagState((object) => {
      return { ...object, [tag]: newValue };
    }); // Tip return new object to trigger re-render
    setFilterExpanded(() => true);
  }

  const topSection = showAddTipForm ? (
    <AddTip
      setTip={setTip}
      newTipId={newTipId}
      tagListAll={tagListAll}
      addTipToDb={addTipToDb}
      inputFormState={inputFormState}
      setInputFormState={setInputFormState}
      addFieldToInputFormState={addFieldToInputFormState}
      addObjectToInputFormState={addObjectToInputFormState}
      showAddTipForm={showAddTipForm}
      setShowAddTipForm={setShowAddTipForm}
      addNewObjectToTips={addNewObjectToTips}
    />
  ) : (
    <Filters
      filterExpanded={filterExpanded}
      setFilterExpanded={setFilterExpanded}
    />
  );
  return (
    <CombinedProviders>
      <DataProvider>
        <section className="page-container">
          <h1>Hello, my name is Gareth...</h1>
          <Header
            title="DevTips"
            setTip={setTip}
            newTipId={newTipId}
            tagListAll={tagListAll}
            addTipToDb={addTipToDb}
            showAddTipForm={showAddTipForm}
            setShowAddTipForm={setShowAddTipForm}
            addObjectToInputFormState={addObjectToInputFormState}
            clearTags={clearTags}
          />
          <section className="body-container">
            {topSection}
            <section className="tip-container">
              <Tips
                setTagStateFromTip={setTagStateFromTip}
                editTip={editTip}
                showAddTipForm={showAddTipForm}
              />
            </section>
          </section>
          <section className="footer"> footer</section>
        </section>
      </DataProvider>
    </CombinedProviders>
  );
}
