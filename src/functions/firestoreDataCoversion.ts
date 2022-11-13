import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export const userConverter = {
  toFirestore(user: UserType): DocumentData {
    return { ...user };
  },
  fromFirestore(docSnap: QueryDocumentSnapshot): UserType {
    return docSnap.data() as UserType;
  },
};

export const postConverter = {
  toFirestore(post: PostType): DocumentData {
    return { ...post };
  },
  fromFirestore(docSnap: QueryDocumentSnapshot): PostType {
    return docSnap.data() as PostType;
  },
};

export const messageConverter = {
  toFirestore(message: MessageType): DocumentData {
    return { ...message };
  },
  fromFirestore(docSnap: QueryDocumentSnapshot): MessageType {
    return docSnap.data() as MessageType;
  },
};
