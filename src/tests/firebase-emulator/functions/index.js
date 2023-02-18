/* eslint-disable @typescript-eslint/no-var-requires */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// exports.addUserDb = functions.firestore
//   .document('users/{user}')
//   .onCreate((snap) => {
//     return snap.ref.update({ submissions: [], replies: [] });
//   });

exports.addNewUser = functions.auth.user().onCreate(async (user) => {
  db.doc(`users/${user.uid}`).set({
    joined_date: admin.firestore.Timestamp.now(),
    id: user.uid,
  });
});
