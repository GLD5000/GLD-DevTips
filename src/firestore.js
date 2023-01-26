import { db } from "./firebase";
import {
  doc,
  deleteDoc,
  // updateDoc,
  // deleteField,
  getDoc,
  getDocs,
  collection,
  setDoc,
  query,
  orderBy,
} from "firebase/firestore";
import makeNewTag from "./utilities/newTagMaker";

const tipsCollection = collection(db, "tips");
const tagsCollection = collection(db, "tags");
const rolesCollection = collection(db, "roles");

export function deleteTipFromCollection(id) {
    deleteDoc(doc(tipsCollection, id));
}
export function deleteTagFromCollection(id) {
  deleteDoc(doc(tagsCollection, id));
}

// async function deleteFieldFromTag(id, field) {
//           await updateDoc(doc(tagsCollection, id), {
//             [field]: deleteField()
//       });
// }
// async function deleteActiveField(tags){
//   Object.entries(tags).forEach(async (entry)=>{
//       const key = entry[0];
//       const tag = entry[1];
//       if (tag.active !== undefined){
//        await deleteFieldFromTag(key, "active")
//       }
//   });
// }

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
    const tagsString = window.sessionStorage.getItem("tags");
    const tagsObject = JSON.parse(tagsString);

    const tipsString = window.sessionStorage.getItem("tips");
    const tipsObject = JSON.parse(tipsString);

    const docRef = doc(tipsCollection, object.id);
    const gotDoc = await getDoc(docRef);
    console.log("Document written as: ", gotDoc.data());
    tipsObject[object.id] = gotDoc.data();
    window.sessionStorage.removeItem("tips");
    window.sessionStorage.setItem("tips", JSON.stringify(tipsObject));
    object.tags.forEach((tagName) => {
      const tagId = tagName.toLowerCase();
      if (tagsObject[tagId] === undefined) {
        tagsObject[tagId] = makeNewTag(tagName);
        addTagToFirestore(tagId, tagsObject[tagId]);
      }
    });
    Object.entries(tagsObject).forEach((tag) => {
      if (tag[1].fromDb !== true) addTagToFirestore(tag[0], tag[1]);
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export async function addTagToFirestore(lowerCaseTagName, tag) {
  try {
    const tagsString = window.sessionStorage.getItem("tags");
    const tagsObject = JSON.parse(tagsString);
    if (tag.fromDb === true || tagsObject[lowerCaseTagName] !== undefined)
      return;
    await addTagToCollection(lowerCaseTagName, tag);
    const docRef = doc(tagsCollection, lowerCaseTagName);
    const gotDoc = await getDoc(docRef);
    tagsObject[lowerCaseTagName] = gotDoc.data();
    window.sessionStorage.removeItem("tags");
    window.sessionStorage.setItem("tags", JSON.stringify(tagsObject));

    console.log("Document written as: ", gotDoc.data());
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getTipsFirestore() {
  const tipsQuery = query(tipsCollection, orderBy("id", "desc"));
  const tipsSnapshot = await getDocs(tipsQuery);
  const tipsObject = {};
  tipsSnapshot.forEach((doc) => {
    tipsObject[doc.id] = { ...doc.data(), visible: true };
  });
  window.sessionStorage.removeItem("tips");
  window.sessionStorage.setItem("tips", JSON.stringify(tipsObject));

  return tipsObject;
}
export async function getTagsFirestore() {
  const tagsQuery = query(tagsCollection, orderBy("name", "asc"));
  const tagsSnapshot = await getDocs(tagsQuery);
  const tagsObject = {};
  tagsSnapshot.forEach((doc) => {
    tagsObject[doc.id] = doc.data();
  });
  window.sessionStorage.removeItem("tags");
  window.sessionStorage.setItem("tags", JSON.stringify(tagsObject));

  return tagsObject;
}

