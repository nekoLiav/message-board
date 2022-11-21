import UserData from './Users.json';
import PostData from './Posts.json';
import ReplyData from './Replies.json';
import SpecialUserData from './SpecialUsers.json';
import { db } from '../../firebase/firebase-config';
import { collection, setDoc, doc } from 'firebase/firestore';

export const populateDB = () => {
  let randomUserIDs = [];
  UserData.forEach((user) => {
    let n = 0;
    const newUserDoc = doc(collection(db, 'users'));
    randomUserIDs.push(newUserDoc.id);
    setDoc(newUserDoc, user);
    for (let i = 0; i < 10; i++) {
      const newPostDoc = doc(collection(db, 'posts'));
      setDoc(newPostDoc, {
        ...PostData[i + n * 10],
        user: newUserDoc.id,
        date_posted: Number(PostData[i + n * 10].date_posted),
      });
    }
    n++;
  });
  for (let i = 0; i < ReplyData.length; i++) {
    const newReplyDoc = doc(collection(db, 'posts'));
    setDoc(newReplyDoc, {
      ...ReplyData[i],
      user: randomUserIDs[Math.floor(Math.random() * randomUserIDs.length)],
      parent: randomUserIDs[Math.floor(Math.random() * randomUserIDs.length)],
      date_posted: Number(ReplyData[i].date_posted),
    });
  }
};

export const populateSpecialDB = () => {
  SpecialUserData.forEach((specialUser) => {
    setDoc(doc(db, 'users', specialUser.id), specialUser);
  });
};
