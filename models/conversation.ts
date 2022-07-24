import { Profile } from "@prisma/client";
import { Message } from "./message";

export const CONVERSATION_TABLE_NAME = "conversations" as const;

export interface Conversation {
    id?: string,
    tenantId: string,
    hostId: string,

    host?: Profile,
    tenant?: Profile,
    messages?: Message[]

    createdAt?: Date,
    updatedAt?: Date,
}

/* VALUES FOR DB */
export const CONVERSATION_PROPERTIES = { 
    TENANT_ID: "tenantId",
    HOST_ID: "hostId", 
    ID: "id"
}  as const;

