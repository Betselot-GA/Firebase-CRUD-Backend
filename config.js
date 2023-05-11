// Import the functions you need from the SDKs you need
const admin = require("firebase-admin")
const credentials = require("./key.json")

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const db = admin.firestore()
const User = db.collection("Users")

module.exports = User