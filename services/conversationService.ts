import { SupabaseClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import {
  Conversation,
  ConversationWithTenant,
  CONVERSATION_PROPERTIES,
  CONVERSATION_TABLE_NAME,
} from "../models/conversation";

export const addConversation = async (
  supabaseClient: SupabaseClient<any, "public", any>,
  conversation: Conversation
) => {
  const { data, error } = await supabaseClient
    .from(CONVERSATION_TABLE_NAME)
    .insert({ ...conversation, id: uuidv4() })
    .single();
  return { data, error };
};

export const getConversationsFromUser = async (supabaseClient: SupabaseClient<any, "public", any>, userId: string) => {
  const { data, error } = await supabaseClient
    .from(CONVERSATION_TABLE_NAME)
    .select(
      "*, host:host_id (*), tenant:tenant_id (*), reservation:reservation_id (*, advertisement:advertisement_id(*))"
    )
    .or(`${CONVERSATION_PROPERTIES.HOST_ID}.eq.${userId},${CONVERSATION_PROPERTIES.TENANT_ID}.eq.${userId}`)
    .order(CONVERSATION_PROPERTIES.CREATED_ID, { ascending: false });
  return { data, error };
};
