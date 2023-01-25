import { db } from "./firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  setDoc,
  query,
  orderBy,
} from "firebase/firestore";

const tipsCollection = collection(db, "tips");
const tagsCollection = collection(db, "tags");
const rolesCollection = collection(db, "roles");

const tipsObject = {};
const tagsObject = {};

async function addTipToCollection(title, object) {
  await setDoc(doc(tipsCollection, title), object);
}
async function addTagToCollection(title, object) {
  object.fromDb = true;
  await setDoc(doc(tagsCollection, title), object);
}

export async function getUserRole(uid) {
  const rolesDoc = await getDoc(doc(rolesCollection, uid));
  const role = await rolesDoc.data()["role"];
  return role;
}


export async function addTipToFirestore(object) {
  try {
    await addTipToCollection(object.id, object);
    const docRef = doc(tipsCollection, object.id);
    const gotDoc = await getDoc(docRef);
    console.log("Document written as: ", gotDoc.data());
    tipsObject[object.id] = gotDoc.data();
    Object.entries(tagsObject).forEach((tag) => {
      if (tag[1].fromDb !== true) addTagToFirestore(tag[0], tag[1]);
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export async function addTagToFirestore(lowerCaseTagName, tag) {
  try {
    if (tag.fromDb === true) return;
    await addTagToCollection(lowerCaseTagName, tag);
    console.group(`tag`);
    console.log(tag);
    console.groupEnd();
    const docRef = doc(tagsCollection, lowerCaseTagName);
    const gotDoc = await getDoc(docRef);
    tagsObject[lowerCaseTagName] = gotDoc.data();
    console.log("Document written as: ", gotDoc.data());
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// async function getDocDataFromDb(docRef) {
//   const gotDoc = await getDoc(docRef);
//   const dataObject = await gotDoc.data();
//   return dataObject;
// }
export async function getTipsFirestore() {
  const tipsQuery = query(tipsCollection, orderBy("id", "desc"));
  const tipsSnapshot = await getDocs(tipsQuery);
  tipsSnapshot.forEach((doc) => {
    tipsObject[doc.id] = { ...doc.data(), visible: true };
  });
  return tipsObject;
}
export async function getTagsFirestore() {
  const tagsQuery = query(tagsCollection, orderBy("name", "asc"));
  const tagsSnapshot = await getDocs(tagsQuery);
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
