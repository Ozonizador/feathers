import { Conversation } from "@prisma/client";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { CONVERSATION_PROPERTIES, CONVERSATION_TABLE_NAME } from "../models/conversation";

export const addConversation = async (conversation) => {
    const { data, error } = await supabaseClient.from<Conversation>(CONVERSATION_TABLE_NAME).insert(conversation).single();
    return { data, error }
};

export const getConversationsFromUser = async (userId: string) => {
    const { data, error } = await supabaseClient.from<Conversation>(CONVERSATION_TABLE_NAME).select().or(`${CONVERSATION_PROPERTIES.HOST_ID}.eq.${userId},${CONVERSATION_PROPERTIES.TENANT_ID}.eq.${userId}`);
    return { data, error }

};
