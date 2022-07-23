
export const NOTIFICATION_TABLE_NAME = "notifications" as const;

export interface Notification {
    id?: string,
    title: string,
    description: string,
    url: string,

    tenantId: string,
    createdAt?: Date,
    updatedAt?: Date,
}

/* VALUES FOR DB */
export const NOTIFICATION_PROPERTIES = { 
    PROFILE_ID: "profileId",
    ID: "id"
}  as const;


export const NOTIFICATION_TITLES = {
    GOOD_NEWS: "boas notícias!",
}

export const NOTIFICATION_DESCRIPTION = {
    COMPLETE_PAYMENTS: "Completa o teu perfil com os métodos de pagamento!",
    ACCEPTED_RESERVATION: "aceitou o teu pedido de reserva!"
}

export const NOTIFICATION_LINKS = {
    STAY: "/unidek/estudante/stay"
}