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

export const NOTIFICATION_LINKS = {
  STAY: "/unidek/estudante/stay",
};

export enum NOTIFICATION_TYPES {
  STUDENT_RESERVATION_DECLINED = "STUDENT_RESERVATION_DECLINED",
  STUDENT_RESERVATION_ACCEPTED = "STUDENT_RESERVATION_ACCEPTED",
  STUDENT_UNIHOSTS_SUPPORT = "STUDENT_UNIHOSTS_SUPPORT",
  STUDENT_COMPLETE_PROFILE = "STUDENT_COMPLETE_PROFILE",
  STUDENT_EVALUATE_STAY = "STUDENT_EVALUATE_STAY",
  LANDLORD_RESERVATION_RECEIVED = "LANDLORD_RESERVATION_RECEIVED",
  LANDLORD_UNIHOSTS_SUPPORT = "LANDLORD_UNIHOSTS_SUPPORT",
  LANDLORD_NEW_REVIEW = "LANDLORD_NEW_REVIEW",
  LANDLORD_COMPLETE_PROFILE = "LANDLORD_COMPLETE_PROFILE",
  LANDLORD_COMPLETE_ADVERT = "LANDLORD_COMPLETE_ADVERT",
  BLOG = "BLOG",
}

export interface NotificationInformation {
  title: string;
  description: string;
}

export const NOTIFICATION_TYPES_INFORMATION = {
  STUDENT_RESERVATION_DECLINED: {
    title: "Más Notícias, Reserva Recusada",
    description: "Infelizmente o pedido de reserva foi recusado.",
  } as NotificationInformation,
  STUDENT_RESERVATION_ACCEPTED: {
    title: "Boas Notícias, Reserva Aceite",
    description: "O teu pedido de reserva foi aceite!",
  } as NotificationInformation,
  STUDENT_UNIHOSTS_SUPPORT: {
    title: "Novidades da equipa de suporte estudante",
    description: "Tens novas mensagens por ler da tua equipa Unihosts!",
  } as NotificationInformation,
  STUDENT_COMPLETE_PROFILE: {
    title: "Completa o teu perfil",
    description: "O senhorio vai gostar de saber mais sobre ti antes de confirmar o pedido de reserva!",
  } as NotificationInformation,
  STUDENT_EVALUATE_STAY: {
    title: "Conta-nos como foi a tua estadia",
    description: "Os comentários/pontuações são importantes para os futuros estudantes.",
  } as NotificationInformation,
  LANDLORD_RESERVATION_RECEIVED: {
    title: "Tens uma novo pedido de reserva!",
    description: "Responde à consulta nas próximas 24 horas!",
  } as NotificationInformation,
  LANDLORD_UNIHOSTS_SUPPORT: {
    title: "Novidades do apoio ao Senhorio",
    description: "Tens novas mensagens por ler da tua equipa Unihosts!",
  } as NotificationInformation,
  LANDLORD_NEW_REVIEW: {
    title: "Recebeste uma nova Avaliação",
    description: "Os comentários/pontuações são importantes para os futuros estudantes.",
  } as NotificationInformation,
  LANDLORD_COMPLETE_PROFILE: {
    title: "Completa o teu perfil",
    description: "Os estudantes vão gostar de saber mais sobre ti antes de reservar!",
  } as NotificationInformation,
  LANDLORD_COMPLETE_ADVERT: {
    title: "Completa o teu anúncio",
    description: "Vários estudantes estão à procura de quarto! Aproveita!",
  } as NotificationInformation,
  BLOG: {
    title: "Lançámos um novo artigo de blog!",
    description: "Confere já na categoria do Estudante as últimas novidades!",
  } as NotificationInformation,
};
