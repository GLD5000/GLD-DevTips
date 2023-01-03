//import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'; 
import { db } from './firebase';
//Additional
import { doc, getDoc, updateDoc } from "firebase/firestore";

const tipsDocRef = doc(db, "devtips", "tips");
const tagsDocRef = doc(db, "devtips", "tags");
const rolesDocRef = doc(db, "devtips", "roles");

export async function getUserRole(uid){
    const rolesDoc = await getDoc(rolesDocRef);
    const role = await rolesDoc.data()[uid];
    return role;
}

export async function addTipToDb(object, tagColours) {

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

async function getDocDataFromDb(docRef) {
    const gotDoc = await getDoc(docRef);
    const dataObject = await gotDoc.data();
    return dataObject;
  }

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

  