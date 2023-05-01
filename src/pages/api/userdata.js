import admin from "lib\firestoreAdmin.js";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
    
    if(req.method == "POST"){
        // Add username to users database
        const db = admin.firestore();

        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(query(usersRef, where("email", "==", req.body.useremail)));
        if (querySnapshot.empty) {
            console.log("email does not exist");
            res.status(404).json({message: "Not found"});
            return;
        } else {
            const userDocRef = querySnapshot.docs[0];
        }

        const newUserDoc = await userDocRef.set({
            username: req.body.username,
          }, 
          { merge: true });
          
        res.send(200).json({message: "ok"});
        
    }
}