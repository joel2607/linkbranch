import admin from "lib/firebaseAdmin";

export default async function handler(req, res) {
  // Initialize Firestore database
  const db = admin.firestore();


  
  
    if(req.method == "POST"){
        console.log(req.body);
        res.send(req.body);
    }
}