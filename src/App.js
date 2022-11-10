import { useState } from "react";

import Header from "./components/header/Header";
import Tips from "./components/tips/Tips";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJ7I6lUNnmKkJd60Gyoox-QfzO5wKdjCU",
  authDomain: "devtips-c1b63.firebaseapp.com",
  projectId: "devtips-c1b63",
  storageBucket: "devtips-c1b63.appspot.com",
  messagingSenderId: "616417597533",
  appId: "1:616417597533:web:445aabc894ece7a57495b4",
  measurementId: "G-D9GBBQW1S0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Auth (emulator)
const auth = getAuth();
const provider = new GoogleAuthProvider();
function App() {

  const [signedIn, setSignedIn] = useState(() => false);
  
  async function  authClickHandler() {
    if (signedIn) await auth.signOut();
    if (!signedIn) await signInWithPopup(auth, provider);
    setSignedIn(() => !signedIn);
  }
  const [tipList, setTip] = useState([
    {
      id: 1,
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
    {
      id: 2,
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
    {
      id: 3,
      date: "4th Feb 2022",
      tags: ["JavaScript", "Nomenclature"],
      title: "Parameters Vs Arguments",
      sections: [
        {
          title: "Parameters",
          type: "text",
          content: "These are the names for values passed into a function.",
        },
        {
          title: "Arguments",
          type: "text",
          content: "These are the actual values passed into a function.",
        },
        {
          type: "table",
          title: "Test Title",

          content: [
            ["Parameter", "Argument", "Variable", "Constant"],
            [
              "Name / Placeholder for values of a function.",
              "Actual value given to a function.",
              "A named reference to a value that can change.",
              "A value that cannot change.",
            ],
          ],
        },
      ],
    },
    {
      id: 4,
      title: "Pure Functions",
      date: "4th Feb 2022",
      tags: ["JavaScript", "Fundamentals"],
      sections: [
        {
          type: "text",
          content: `Similar to mathematical functions. 

A given input will always return the same output. 

They only return values and do not mutate objects or create side effects. 

This means they are easy to test, can be composed and can be run in parallel without blocking each other.`,
        },
      ],
    },
  ]);
  const tagList = Object.fromEntries([
    ...new Set(tipList.flatMap((tip) => tip.tags).map((x) => [x, "visible"])),
  ]);
  const tagListAll = Object.keys(tagList);
  const [tagState, setTagState] = useState(() => {
    return tagList;
  }); // Tip init functions only run once
  const newTipId = tipList.length + 1;
  const [searchQuery, setSearchQuery] = useState("");
  function testtagState(tagState, tagArray) {
    const tagStateValue = Object.values(tagState);
    if (!tagStateValue.includes("active")) return true;
    let returnBoolean = true;
    const activeTags = Object.entries(tagState).reduce((acc, entry) => {
      if (entry[1] === "active") acc.push(entry[0]); // Tip push returns length not array
      return acc;
    }, []);
    activeTags.forEach((activeTag) => {
      if (!tagArray.includes(activeTag)) returnBoolean = false;
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
    return tipList.filter((tip) => filterSearchTip(tip));
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
  return (
    <section className="body-container">
      <Header
        title="Tip Town 5000"
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
      />

      <section className="tip-container">
        <Tips tipList={filteredTipList} setTagState={setTagState} />
      </section>
    </section>
  );
}

export default App;
