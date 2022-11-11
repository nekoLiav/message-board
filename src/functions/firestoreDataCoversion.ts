import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export const postConverter = {
  toFirestore(post: PostType): DocumentData {
    return { ...post };
  },
  fromFirestore(docSnap: QueryDocumentSnapshot): PostType {
    return docSnap.data() as PostType;
  },
};

export const userConverter = {
  toFirestore(user: UserType): DocumentData {
    return { ...user };
  },
  fromFirestore(docSnap: QueryDocumentSnapshot): UserType {
    return docSnap.data() as UserType;
  },
};
