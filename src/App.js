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
let getTagColours;

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



function App() {
  async function tagHexLookup(tag, tagColours){
    tag = tag.toLowerCase();
    const tagNotPresent = tagColours[tag] === undefined;
    
    if (tagNotPresent) {
      const backgroundColour = getRandomColour();
      const textColour = AutoTextColour(backgroundColour);
      tagColours[tag] = [backgroundColour, textColour];
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

      console.log("You are not authorised to submit tips to the database- sorry!");

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
    console.log(object);
    if (object === null) {
      initialiseInputFormState();
      return;
    }
    setInputFormState(() => {
      const newObject = { ...object };
      newObject.tags = [...object.tags];
      newObject.sections = object.sections.map((x) => {
        return { ...x };
      });
      return newObject;
    });
  }
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
    "0002":{
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
    }
  };
  const [tipList, setTip] = useState(exampleObject);
  const [tagColours, setTagColours] = useState(() => {return {javascript: ["#EAD41C", "#000000"],
  github: ["#3B6FAB", "#ffffff"],
  vscode: ["#48AAEB", "#000000"],}});
  const [showAddTipForm, setShowAddTipForm] = useState(() => false);
  async function getDbData() {
    const tipsObject = await getDocDataFromDb(tipsDocRef);
    setTip(() => tipsObject);
    
   const tagColoursObject = await getDocDataFromDb(tagsDocRef);
   setTagColours(() => tagColoursObject);
   //console.log(tagColours);
   getTagColours = true;

   gotDbData = true;
  }
  if (gotDbData === false) {
    getDbData();
  }

  async function addTipToDb(object) {
    console.log(`signedIn ${signedIn}`);
    
    // console.group(`object`);
    // console.log(object);
    // console.groupEnd();
        
    if (!signedIn) {
      console.log("Not Signed in");
      return;
    }

    try {
      await updateDoc(tipsDocRef, {
        [object.id]: object,
      });
      const gotDoc = await getDoc(tipsDocRef);

      console.log("Document written as: ", gotDoc.data()[object.id]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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

  const tagList = Object.fromEntries([
    ...new Set(
      Object.values(tipList)
        .flatMap((tip) => tip.tags)
        .map((x) => [x, "visible"])
    ),
  ]);
  const tagListAll = Object.keys(tagList);
   function mapTagColours(tagColours){
    const newTagColours = {...tagColours}
      tagListAll.forEach( (tag) => {
       tagHexLookup(tag, newTagColours);

    });
    console.log(newTagColours);
    getTagColours = false;  
    return newTagColours;
  }
 function updateTagColours(){
    setTagColours(()=> {return{...mapTagColours()}})
  }
  if (getTagColours){
    updateTagColours();
  }
  const [tagState, setTagState] = useState(() => {
    return tagList;
  }); // Tip init functions only run once
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

  const [mainTitle, setMainTitle] = useState(() => "No Title Yet");
  const [inputTags, setInputTags] = useState(() => []);

  async function editTip(e) {
    const id = e.target.id;
    const tipObject = tipList[id];
    addObjectToInputFormState(tipObject); 
    setShowAddTipForm(true);
  }

  return (
    <section className="page-container">
      <Header
        title="GLD DevTips"
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
      />
      <section className="body-container">
        <Filters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          titleSet={titleSet}
          tagSet={tagSet}
          setTagState={setTagState}
          tagState={tagState}
        />

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
          mainTitle={mainTitle}
          setMainTitle={setMainTitle}
          inputTags={inputTags}
          setInputTags={setInputTags}
        />
        <section className="tip-container">
          <Tips
            tipList={filteredTipList}
            setTagState={setTagState}
            editTip={editTip}
          />
        </section>
      </section>
    </section>
  );
}
export default App;
