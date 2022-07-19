
export const MESSAGE_TABLE_NAME = "messages" as const;

export interface Message {
    id: string,
    message: string,
    hostId: string,
    tenantId: string,
    createdAt: Date,
    updatedAt: Date
}