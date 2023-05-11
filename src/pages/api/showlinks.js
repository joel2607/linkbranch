import admin from "lib/firestoreAdmin.js";

export default async function handler(req, res) {
    
    if(req.method == "POST"){
        // Get all links
        
        const db = admin.firestore();

        var myLinks = [];
        
        const usersRef = db.collection("users");
        
        const querySnapshot = await usersRef.where('username', '==', req.body.username).get();
        if (querySnapshot.empty) {
            console.log("username does not exist");
            res.status(404).json({ links: [], message: "Username does not exist"});;
            return;
        } else {
            const linksRef = querySnapshot.docs[0].ref.collection("links");
            const links = await linksRef.get();
            links.forEach(doc => {
                myLinks.push(doc.data());
            });
            res.status(200).json({ links: myLinks });
        }
        
    }

}