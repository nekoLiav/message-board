import { messageThreadByMessageId } from 'api/queries/message/messageThreadByMessageId';

export const getMessageThread = async (message_id: string) => {
  const thread = await messageThreadByMessageId(message_id);
  return { data: thread };
};
