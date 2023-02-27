import { Message, Messages, MESSAGE_TABLE_NAME, MESSAGE_TABLE_PROPERTIES } from "../models/message";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useMessagesService = () => {
  const supabaseClient = useSupabaseClient();
  const insertMessageOnConversation = async (message: string, conversation_id: string, profile_id: string) => {
    const { data, error } = await supabaseClient
      .from<"messages", Messages>(MESSAGE_TABLE_NAME)
      .insert({ message, conversation_id, profile_id })
      .select()
      .single();
    return { data, error };
  };

  const getMessagesFromConversationId = async (conversation_id: string) => {
    const { data, error } = await supabaseClient
      .from(MESSAGE_TABLE_NAME)
      .select()
      .eq(MESSAGE_TABLE_PROPERTIES.CONVERSATION_ID, conversation_id);
    return { data, error };
  };

  return { insertMessageOnConversation, getMessagesFromConversationId };
};

export default useMessagesService;
