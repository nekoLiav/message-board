/* eslint-disable @typescript-eslint/no-var-requires */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.addNewUser = functions.auth.user().onCreate(async (user) => {
  db.doc(`users/${user.uid}`).set({
    joined_date: admin.firestore.Timestamp.now(),
    id: user.uid,
    name: '',
    blurb: '',
    avatar: '',
    follower_count: 0,
    following_count: 0,
    post_count: 0,
    gender: '',
    profile_color: '#FFFFFF',
  });
});
