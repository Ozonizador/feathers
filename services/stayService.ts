import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { Stay, STAYS_TABLE_NAME } from "../models/stay";

export const addStay = async (stay: Stay) => {
  const { data, error } = await supabaseClient
    .from<Stay>(STAYS_TABLE_NAME)
    .insert({ ...stay, id: uuidv4(), updatedAt: new Date() }, { returning: "minimal" })
    .single();
  return { data, error };
};

export const getStays = async () => {
  const { data, error } = await supabaseClient.from<Stay>(STAYS_TABLE_NAME).select();
  return { data, error };
};
