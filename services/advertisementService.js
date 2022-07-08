import { supabase } from "../utils/supabaseClient";
import { Advertisement } from "../models/advertisement";

export const addAdvertisement = () => {
    const { data, error } = await supabase.from<Advertisement>
};
