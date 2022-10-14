import { Message, MESSAGE_TABLE_NAME, MESSAGE_TABLE_PROPERTIES } from "../models/message";
import { v4 as uuidv4 } from "uuid";

export const insertMessageOnConversation = async (message: string, conversation_id: string, profile_id: string) => {
  const { data, error } = await supabaseClient
    .from<Message>(MESSAGE_TABLE_NAME)
    .insert({ message, conversation_id, id: uuidv4(), profile_id, updated_at: new Date() })
    .single();
  return { data, error };
};

export const getMessagesFromConversationId = async (conversation_id: string) => {
  const { data, error } = await supabaseClient
    .from<Message>(MESSAGE_TABLE_NAME)
    .select()
    .eq(MESSAGE_TABLE_PROPERTIES.CONVERSATION_ID, conversation_id);
  return { data, error };
};
