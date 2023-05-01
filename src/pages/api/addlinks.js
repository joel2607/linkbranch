import admin from "lib/firestoreAdmin.js";

export default async function handler(req, res) {
    
    if(req.method == "POST"){
        // adds a link given a request of format {email: email, name: name, link: link}
        
        const db = admin.firestore();

        var myLinks = [];
        
        const usersRef = db.collection("users");
        
        const querySnapshot = await usersRef.where('email', '==', req.body.useremail).get();
        if (querySnapshot.empty) {
            console.log("user does not exist");
            res.status(404).json({ links: [] });
            return;
        } else {
            
            const linksRef = querySnapshot.docs[0].ref.collection("links");
            const links = await linksRef.get();
            await linksRef.add({
                name: req.body.linkname,
                link: req.body.link
            });
            links.forEach(doc => {
                myLinks.push(doc.data());
            });
            res.status(200).json({ links: myLinks });
        }
        
    }

}