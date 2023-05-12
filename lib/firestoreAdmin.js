import admin from "firebase-admin";



if (!admin.apps.length) {
  var serviceAccount = require("linkmap-385313-firebase-adminsdk-r35e1-a45ab24728.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;