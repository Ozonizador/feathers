import { Database } from "../database.types";
import {
  GENERAL_ADMIN_URL,
  HOME_URL,
  INBOX_URL,
  UNIDESK_SENHORIO_PAINEL_URL,
  UNIDESK_SENHORIO_REVIEWS_URL,
  UNIDESK_STAY_URL,
} from "./paths";

export const NOTIFICATION_TABLE_NAME = "notifications" as const;

export type NotificationsResponse = Database["public"]["Tables"]["notifications"];
export type Notification = NotificationsResponse["Row"];

/* VALUES FOR DB */
export const NOTIFICATION_PROPERTIES = {
  PROFILE_ID: "profile_id",
  ID: "id",
  SEEN: "seen",
} as const;

export const NOTIFICATION_LINKS = {
  STUDENT_EVALUATE_STAY: UNIDESK_STAY_URL,
  STUDENT_RESERVATION_DECLINED: UNIDESK_STAY_URL,
  STUDENT_RESERVATION_ACCEPTED: UNIDESK_STAY_URL,
  STUDENT_UNIHOSTS_SUPPORT: HOME_URL,
  STUDENT_COMPLETE_PROFILE: GENERAL_ADMIN_URL,
  LANDLORD_RESERVATION_RECEIVED: INBOX_URL,
  LANDLORD_UNIHOSTS_SUPPORT: HOME_URL,
  LANDLORD_NEW_REVIEW: UNIDESK_SENHORIO_REVIEWS_URL,
  LANDLORD_COMPLETE_PROFILE: GENERAL_ADMIN_URL,
  LANDLORD_COMPLETE_ADVERT: UNIDESK_SENHORIO_PAINEL_URL,
  BLOG: HOME_URL,
};

export const BUTTON_MESSAGE_LABEL = {
  STUDENT_EVALUATE_STAY: "Ir para estadias",
  STUDENT_RESERVATION_DECLINED: "Ir para estadias",
  STUDENT_RESERVATION_ACCEPTED: "Ir para estadias",
  STUDENT_UNIHOSTS_SUPPORT: "Ver",
  STUDENT_COMPLETE_PROFILE: "Ir para perfil",
  LANDLORD_RESERVATION_RECEIVED: "Ir para a caixa de entrada",
  LANDLORD_UNIHOSTS_SUPPORT: "Ver",
  LANDLORD_NEW_REVIEW: "Ver Review",
  LANDLORD_COMPLETE_PROFILE: "Ir para perfil",
  LANDLORD_COMPLETE_ADVERT: "Ver anúncios",
  BLOG: "Ver",
};

export type NotificationType = Database["public"]["Enums"]["NotificationType"];

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
    title: "Tens um novo pedido de reserva!",
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
