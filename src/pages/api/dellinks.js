import admin from "lib/firestoreAdmin.js";

export default async function handler(req, res) {
    
    if(req.method == "POST"){
        // deletes a link given a request of format {useremail: email, name: name}
        
        const db = admin.firestore();

        var myLinks = [];
        
        const usersRef = db.collection("users");
        
        const querySnapshot = await usersRef.where('email', '==', req.body.useremail).get();
        if (querySnapshot.empty) {
            console.log("user does not exist");
            res.status(404).json({ links: [] });
            return;
        }
            
        const linksRef = querySnapshot.docs[0].ref.collection("links");
        const links = await linksRef.get();
        const linksQuerySnapshot = await linksRef.where('name', '==', req.body.name).get();
        await querySnapshot.docs[0].ref.delete();

        if (linksQuerySnapshot.empty) {
            console.log("link does not exist");
            res.status(404).json({ links: [] });
            return;
        }

        links.forEach(doc => {
            myLinks.push(doc.data());
        });
        
        res.status(200).json({ links: myLinks });

        
    }

}