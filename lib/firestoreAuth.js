import { initFirestore } from "@next-auth/firebase-adapter";



var admin = require("firebase-admin");

var serviceAccount = require("linkmap-385313-firebase-adminsdk-r35e1-a45ab24728.json");



export const firestore = initFirestore({
  credential: admin.credential.cert(serviceAccount)
});