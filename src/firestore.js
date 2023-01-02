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