import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Conversation, Conversations, CONVERSATION_PROPERTIES, CONVERSATION_TABLE_NAME } from "../models/conversation";
import { Profile } from "../models/profile";
import { ReservationWithAdvertisement } from "../models/reservation";

export type ConversationComplete = Conversation & {
  host: Profile;
  tenant: Profile;
  reservation: ReservationWithAdvertisement;
};

const useConversationService = () => {
  const supabaseClient = useSupabaseClient();

  const getConversationsFromUser = async (userId: string) => {
    const { data, error } = await supabaseClient
      .from<"conversations", Conversations>(CONVERSATION_TABLE_NAME)
      .select(
        "*, host:host_id(*), tenant:tenant_id(*), reservation:reservation_id(*, advertisement:advertisement_id(*))"
      )
      .or(`${CONVERSATION_PROPERTIES.HOST_ID}.eq.${userId},${CONVERSATION_PROPERTIES.TENANT_ID}.eq.${userId}`)
      .order(CONVERSATION_PROPERTIES.UPDATED_ID, { ascending: false });

    return { data, error };
  };

  return { getConversationsFromUser };
};

export default useConversationService;
