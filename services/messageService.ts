import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Message, MESSAGE_TABLE_NAME, MESSAGE_TABLE_PROPERTIES } from "../models/message";
import { v4 as uuidv4 } from 'uuid';

export const insertMessageOnConversation = async (message: string, conversationId: string,  profileId: string) => {
    const { data, error } = await supabaseClient.from<Message>(MESSAGE_TABLE_NAME).insert({message, conversationId,  id: uuidv4(), profileId, updatedAt: new Date() }).single();
    return { data, error }
};

export const getMessagesFromConversationId = async (conversationId: string) => {
    const { data, error } = await supabaseClient.from<Message>(MESSAGE_TABLE_NAME).select().eq(MESSAGE_TABLE_PROPERTIES.CONVERSATION_ID, conversationId);
    return { data, error }
};
