export {};

declare global {
  export type UserType = {
    avatar: string;
    birthday: number;
    blurb: string;
    follower_count: number;
    following_count: number;
    gender: string;
    handle: string;
    id: string;
    name: string;
    post_count: number;
    profile_color: string;
  };

  export type PostType = {
    user_data: {
      id: string;
      name: string;
      handle: string;
      avatar: string;
    };
    date_posted: number;
    post_id: string;
    parent_ids: string[];
    text: string;
    direct_parent?: string;
    img_url?: string;
    vid_url?: string;
    replies: number;
    reposts: number;
    likes: number;
    tags: string[];
    is_reply: boolean;
  };

  export type MessageType = {
    user_data: {
      id: string;
      name: string;
      handle: string;
      avatar: string;
    };
    date_posted: number;
    message_id: string;
    recipient: string;
    text: string;
    parent_id?: string;
    img_url?: string;
    vid_url?: string;
    is_reply: boolean;
  };
}
