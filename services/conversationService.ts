import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { Conversation, CONVERSATION_PROPERTIES, CONVERSATION_TABLE_NAME } from "../models/conversation";

export const addConversation = async (conversation: Conversation) => {
  const { data, error } = await supabaseClient
    .from<Conversation>(CONVERSATION_TABLE_NAME)
    .insert({ ...conversation, id: uuidv4() })
    .single();
  return { data, error };
};

export const getConversationsFromUser = async (userId: string) => {
  const { data, error } = await supabaseClient
    .from<Conversation>(CONVERSATION_TABLE_NAME)
    .select("*, host:hostId (*), tenant:tenantId (*), reservation:reservationId (*, advertisement:advertisementId(*))")
    .or(`${CONVERSATION_PROPERTIES.HOST_ID}.eq.${userId},${CONVERSATION_PROPERTIES.TENANT_ID}.eq.${userId}`)
    .order(CONVERSATION_PROPERTIES.CREATED_ID, { ascending: false });
  return { data, error };
};
