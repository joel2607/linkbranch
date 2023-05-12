import admin from "lib/firestoreAdmin.js";

export default async function handler(req, res) {
    const db = admin.firestore();
    const usersRef = db.collection("users");

    if(req.method == "GET"){
        // Get all usernames existing
        let usersList = [];
        const users = await usersRef.get();
        users.forEach(userDoc => {
           usersList.push(userDoc.data());
        });
        console.log(usersList);
        res.status(200).json({users: usersList});
    }
    
    if(req.method == "POST"){
        // Add username to users database
        
        const usernameQuerySnapshot = await usersRef.where('username', '==', req.body.username).get();
        if (!usernameQuerySnapshot.empty) {
            console.log("username already exists");
            res.status(422).json({message: "username already exists"});
            return;
        }
        const querySnapshot = await usersRef.where('email', '==', req.body.useremail).get();
        if (querySnapshot.empty) {
            console.log("email does not exist");
            res.status(404).json({message: "Not found"});
            return;
        } else {
            await querySnapshot.docs[0].ref.set({
                username: req.body.username,
              }, 
              { merge: true });
        }
        res.status(200).json({message: "added username" + req.body.username});
        
    }
}