//import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'; 
import { db } from './firebase';
//Additional
import { doc, getDoc, getDocs, updateDoc, collection, setDoc, query, orderBy } from "firebase/firestore";

const tipsDocRef = doc(db, "devtips", "tips");
const tagsDocRef = doc(db, "devtips", "tags");
const rolesDocRef = doc(db, "devtips", "roles");

const tipsCollection = collection(db, "tips");
const tagsCollection = collection(db, "tags");
const rolesCollection = collection(db, "roles");

export async function addTipToCollection(title, object){
  await setDoc(doc(tipsCollection, title), object);
}
export async function addTagToCollection(title, object){
  await setDoc(doc(tagsCollection, title), object);
}



export async function getUserRole(uid){
    const rolesDoc = await getDoc(doc(rolesCollection, uid));
    const role = await rolesDoc.data()["role"];
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


  export async function getTipsFirestore() {
    const tipsQuery = query(tipsCollection, orderBy("id", "desc"));
    const tipsSnapshot = await getDocs(tipsQuery);
    const tipsObject = {};
    tipsSnapshot.forEach((doc) => {
      tipsObject[doc.id] = doc.data();
    });
    return tipsObject;
  }
  export async function getTagsFirestore() {
    const tagsQuery = query(tagsCollection, orderBy("name", "asc"));
    const tagsSnapshot = await getDocs(tagsQuery);
    const tagsObject = {};
    tagsSnapshot.forEach((doc) => {
      tagsObject[doc.id] = doc.data();
    });
    return tagsObject;
  }

      // Object.entries(result).forEach(entry => {
    //   const key = entry[0];
    //   const value = entry[1];
    //   addTagToCollection(key,value);
    // })
    // Object.entries(result).forEach(entry => {
    //   const key = entry[0];
    //   const value = entry[1];
    //   addTipToCollection(key,value);
    // })
