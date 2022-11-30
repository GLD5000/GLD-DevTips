import { useState } from "react";
import Header from "./components/header/Header";
import Tips from "./components/tips/Tips";
import AddTip from "./components/header/AddTip/AddTip";
import Filters from "./components/header/Filters";

import getRandomColour from "./utilities/randomColour";
import AutoTextColour from "./utilities/autoTextColour";

//import tagHexLookup from "./utilities/tagHex";
//import autoTextColour from "./utilities/autoTextColour";

import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//Firestore
const database = getFirestore(app);
const tipsDocRef = doc(database, "devtips", "tips");
const tagsDocRef = doc(database, "devtips", "tags");
const rolesDocRef = doc(database, "devtips", "roles");
//Auth
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
let userCount = 0;
async function addTipToDb(object) {
  console.log("Adding tag to db...");
  try {
    await updateDoc(tipsDocRef, {
      [object.id]: object,
    });
    const gotDoc = await getDoc(tipsDocRef);
    console.log("Document written as: ", gotDoc.data()[object.id]);
    Object.entries(tagColours).forEach((tag) => {
      if (tag[1].fromDb !== true) addTagToDb(tag[0], tag[1]);
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export async function addTagToDb(lowerCaseTagName, tag) {
  try {
    await updateDoc(tagsDocRef, {
      [lowerCaseTagName]: tag,
    });
    const gotDoc = await getDoc(tagsDocRef);

    console.log("Document written as: ", gotDoc.data()[lowerCaseTagName]);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const tagsObject = {};

function App() {
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
      if (isOwner) {
        addTagToDb(lowerCaseTagName, tagColours[lowerCaseTagName]);
      }
    }
    return tagColours;
  }

  async function getDocDataFromDb(docRef) {
    const gotDoc = await getDoc(docRef);
    const dataObject = await gotDoc.data();
    return dataObject;
  }

  async function checkRole(user) {
    console.log("checkRole");
    const uid = user.uid;
    const rolesDoc = await getDoc(rolesDocRef);
    const role = await rolesDoc.data()[uid];
    const isOwner = role === "owner";
    if (isOwner) {
      console.log("Is owner = " + isOwner);
      console.log("signing in...");
      setSignedIn(true);

      setIsOwner(true);
    } else {
      console.log("signing in...");
      setSignedIn(true);
      setIsOwner(false);

      console.log(
        "You are not authorised to submit tips to the database- sorry!"
      );

      setIsOwner(false);
    }
    return isOwner;
  }
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (userCount < 3) {
        userCount += 1;
        console.log(userCount);
        if (userCount === 1 || signedIn === false) checkRole(user);
      }
    } else {
      if (userCount !== 0) {
        console.log("signing out...");
        console.log(userCount);
        setSignedIn(false);
        setIsOwner(false);
        userCount -= 1;
      }
    }
  });

  const inputFormStarter = {
    title: null,
    id: null,
    sections: [{ type: "text", content: null }],
    tags: [],
    date: null,
  };
  const [inputFormState, setInputFormState] = useState(() => inputFormStarter);
  function initialiseInputFormState() {
    setInputFormState(() => inputFormStarter);
    //Set all fields of InputFormState
  }

  function addFieldToInputFormState(key, value) {
    setInputFormState((object) => {
      const newObject = { ...object };
      newObject[key] = value;
      return newObject;
    });
  }

  function addObjectToInputFormState(object) {
    console.log("Adding object to inputFormState...");
    console.group(`object`);
    console.log(object);
    console.groupEnd();
    if (object === null) {
      initialiseInputFormState();
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

  const [signedIn, setSignedIn] = useState(() => false);
  const [isOwner, setIsOwner] = useState(() => false);

  async function authClickHandler() {
    if (signedIn) {
      await auth.signOut();
    } else if (!signedIn) {
      await signInWithPopup(auth, provider);
    }
  }

  // const tagList = Object.fromEntries([
  //   ...new Set(
  //     Object.values(tipList)
  //       .flatMap((tip) => tip.tags)
  //       .map((x) => [x, "visible"])
  //   ),
  // ]);
  const [tagState, setTagState] = useState(tagsObject); // Tip init functions only run once
  function getTags(updatedTagState) {
    Object.keys(tagColours)
      .sort()
      .forEach((key) => {
        tagsObject[tagColours[key].name] = "visible";
      });
    updatedTagState = true;
  }
  if (gotDbTagColours && Object.keys(tagState).length < 10) {
    getTags(updatedTagState);

    setTagState((oldState) => {
      // console.log(oldState);
      //console.log(tagsObject);
      return { ...tagsObject };
    });
  }
  //console.log(tagState);
  //console.log(Object.keys(tagColours).sort());
  const tagListAll = Object.keys(tagState);
  function mapTagColours(tagColours) {
    tagListAll.forEach((tag) => {
      tagHexLookup(tag, tagColours);
    });
    gotDbTagColours = false;
    return tagColours;
  }
  function updateTagColours() {
    mapTagColours(tagColours);
  }
  if (gotDbTagColours) {
    updateTagColours();
  }
  function padIdNumber(number) {
    return number.toString(10).padStart(4, "0");
  }

  function makeNewTipId() {
    const number = Object.values(tipList).length + 1;
    const paddedNumber = padIdNumber(number);
    return paddedNumber;
  }
  const newTipId = makeNewTipId();
  const [searchQuery, setSearchQuery] = useState("");

  function testtagState(tagState, tagArray) {
    //console.log(tagState);
    //console.log(tagArray);
    const tagStateValue = Object.values(tagState);
    if (!tagStateValue.includes("active")) return true;
    let returnBoolean = false;
    const activeTags = Object.entries(tagState).reduce((acc, entry) => {
      if (entry[1] === "active") acc.push(entry[0]);
      return acc;
    }, []);
    // console.log(activeTags);
    activeTags.forEach((activeTag) => {
      if (tagArray.includes(activeTag)) returnBoolean = true;
    });
    return returnBoolean;
  }
  function filterSearchTip(tip) {
    return (
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      testtagState(tagState, tip.tags)
    );
  }
  function filterTiplist(tipList) {
    return Object.values(tipList).filter((tip) => filterSearchTip(tip));
  }
  const filteredTipList = filterTiplist(tipList);

  let tagArray = [];
  function createTagSet(filteredTipList) {
    filteredTipList.forEach((tip) => {
      tagArray.push(...tip.tags);
    });
    return new Set(tagArray);
  }

  function createTitleSet(filteredTipList) {
    return filteredTipList.map((x) => x.title);
  }

  const tagSet = createTagSet(filteredTipList);
  const titleSet = createTitleSet(filteredTipList);

  async function editTip(e) {
    const id = e.target.id;
    const tipObject = tipList[id];
    addObjectToInputFormState(tipObject);
    setShowAddTipForm(true);
    setSearchQuery(() => tipObject.title)
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

  function setTagStateFromTip(tag){
    const newValue = tagState[tag] === "active"? "visible": "active";
    setTagState((object) => {
      return {...object, [tag]: newValue}}); // Tip return new object to trigger re-render
      setFilterExpanded(() => true);
  }

  const topSection = showAddTipForm ? (
    <AddTip
      authClickHandler={authClickHandler}
      setTip={setTip}
      newTipId={newTipId}
      tagListAll={tagListAll}
      addTipToDb={addTipToDb}
      signedIn={signedIn}
      isOwner={isOwner}
      inputFormState={inputFormState}
      setInputFormState={setInputFormState}
      addFieldToInputFormState={addFieldToInputFormState}
      addObjectToInputFormState={addObjectToInputFormState}
      showAddTipForm={showAddTipForm}
      setShowAddTipForm={setShowAddTipForm}
      addNewObjectToTips={addNewObjectToTips}
      setSearchQuery={setSearchQuery}
    />
  ) : (
    <Filters
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      titleSet={titleSet}
      setTagState={setTagState}
      tagState={tagState}
      filterExpanded={filterExpanded}
      setFilterExpanded={setFilterExpanded}
    />
  );
  return (
    <section className="page-container">
      <h1>Hello, my name is Gareth...</h1>
      <Header
        title="DevTips"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setTagState={setTagState}
        tagState={tagState}
        tagSet={tagSet}
        titleSet={titleSet}
        setTip={setTip}
        newTipId={newTipId}
        tagListAll={tagListAll}
        authClickHandler={authClickHandler}
        signedIn={signedIn}
        addTipToDb={addTipToDb}
        showAddTipForm={showAddTipForm}
        setShowAddTipForm={setShowAddTipForm}
        addObjectToInputFormState={addObjectToInputFormState}
      />
      <section className="body-container">
        {topSection}
        <section className="tip-container">
          <Tips
            tipList={filteredTipList}
            setTagStateFromTip={setTagStateFromTip}
            editTip={editTip}
            showAddTipForm={showAddTipForm}
          />
        </section>
      </section>
      <section className="footer"> footer</section>
    </section>
  );
}
export default App;
