import { Database } from "../database.types";

export const HOST_RENT_PREFERENCES_TABLE_NAME = "host_rent_preferences" as const;
export type HostRentPreferencesTable = Database["public"]["Tables"]["host_rent_preferences"];
export type HostRentPreferences = HostRentPreferencesTable["Row"];

export const HOST_RENT_PREFERENCES_TABLE_COLUMNS = {
  ID: "ID",
  HOST_ID: "HOST_ID",
} as const;
