export const NOTIFICATION_TABLE_NAME = "notifications" as const;

export interface Notification {
  id?: string;
  title: string;
  description: string;
  url: string;

  profileId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/* VALUES FOR DB */
export const NOTIFICATION_PROPERTIES = {
  PROFILE_ID: "profileId",
  ID: "id",
} as const;

export const NOTIFICATION_TITLES = {
  GOOD_NEWS: "boas notícias!",
};

export const NOTIFICATION_DESCRIPTION = {
  COMPLETE_PAYMENTS: "Completa o teu perfil com os métodos de pagamento!",
  ACCEPTED_RESERVATION: "aceitou o teu pedido de reserva!",
};

export const NOTIFICATION_LINKS = {
  STAY: "/unidek/estudante/stay",
};

export const NOTIFICATION_TYPES = {
  STUDENT_RESERVATION_DECLINED: {
    title: "",
    description: "",
  },
  STUDENT_RESERVATION_ACCEPTED: {
    title: "",
    description: "",
  },
  STUDENT_UNIHOSTS_SUPPORT: {
    title: "",
    description: "",
  },
  STUDENT_COMPLETE_PROFILE: {
    title: "",
    description: "",
  },
  STUDENT_EVALUATE_STAY: {
    title: "",
    description: "",
  },
  LANDLORD_RESERVATION_RECEIVED: {
    title: "",
    description: "",
  },
  LANDLORD_UNIHOSTS_SUPPORT: {
    title: "",
    description: "",
  },
  LANDLORD_NEW_REVIEW: {
    title: "",
    description: "",
  },
  LANDLORD_COMPLETE_PROFILE: {
    title: "",
    descripion: "",
  },
  LANDLORD_COMPLETE_ADVERT: { title: "", description: "" },
  BLOG: {
    title: "",
    description: "",
  },
};
