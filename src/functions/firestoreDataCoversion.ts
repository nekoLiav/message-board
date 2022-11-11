import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export const postConverter = {
  toFirestore(post: PostType): DocumentData {
    console.log('Went through to-converter');
    return { ...post };
  },
  fromFirestore(docSnap: QueryDocumentSnapshot): PostType {
    console.log('Went through from-converter');
    return docSnap.data() as PostType;
  },
};

export const userConverter = {
  toFirestore(user: UserType): DocumentData {
    console.log('Went through to-converter');
    return { ...user };
  },
  fromFirestore(docSnap: QueryDocumentSnapshot): UserType {
    console.log('Went through from-converter');
    return docSnap.data() as UserType;
  },
};
