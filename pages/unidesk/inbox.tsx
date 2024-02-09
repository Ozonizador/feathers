import CaixaCard from "../../components/CaixaEntrada/CaixaCard/CaixaCard";
import {
  useCurrentUser,
  useGetUserDates,
  useGetUserType,
  useSetSearchLocationByProperty,
} from "../../context/MainProvider";
import React, { useCallback, useEffect, useState, useRef } from "react";
import useConversationService, { ConversationComplete } from "../../hooks/conversationService";
import useMessagesService from "../../hooks/messageService";
import { MessageWithProfile } from "../../models/message";
import Mensagem from "../../components/CaixaEntrada/Mensagem/Mensagem";
import { Avatar } from "flowbite-react";
import { ReservationStatus, ReservationStatusLabel } from "../../models/reservation";
import { AdvertisementComplete, TYPE_ADVERTISEMENT } from "../../models/advertisement";
import { ImCross } from "react-icons/im";
import useReservationService from "../../hooks/reservationService";
import iconfavorito from "../../public/images/icon-pg37-1.svg";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import classNames from "classnames";
import { GetServerSidePropsContext } from "next";
import BreadcrumbMiddle from "../../components/utils/BreadcrumbMiddle";
import IconCaixa from "../../public/images/iconCaixa.svg";
import Button from "../../components/utils/Button";
import Link from "next/link";
import { Profile } from "../../models/profile";
import Breadcrumbs, { BreadcrumbPath } from "../../components/utils/Breadcrumbs";
import { UNIDESK_URL } from "../../models/paths";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { update } from "lodash";
import { IoArrowBackOutline, IoSend } from "react-icons/io5";
import { trpc } from "../../utils/trpc";
import { formatWithOptions } from "date-fns/fp";
import { enGB, pt } from "date-fns/locale";
import Locale from "react-phone-number-input/locale/en.json";
import router, { useRouter } from "next/router";
import { UnideskStructure } from "../../components/unidesk/UnideskStructure";
import MenuEstudante from "../../components/unidesk/Menus/MenuEstudante";
import MenuSenhorio from "../../components/unidesk/Menus/MenuSenhorio";
import {
  ModalAnuncioInfoProvider,
  ModalGerarReferenciaProvider,
  useSetModalDetalhesPagamento,
  useSetModalGerarReferencia,
  useSetModalGerarReferenciaInfo,
  useSetModalGerarReferenciaReservation,
} from "../../context/ModalShowProvider";
import { truncate } from "fs";
import { useSetAdvertisement } from "../../context/AdvertisementController";
import ModalGerarReferencia from "../../components/modals/ModalGerarReferencia";
import {
  ShowingSingleAdvertisementProvider,
  useSetSingleAdvertisement,
} from "../../context/ShowingSingleAdvertisementProvider";
import ModalDetalhesPagamento from "../../components/modals/ModalDetalhesPagamentos";
import { advertisementsRouter } from "../../server/routers/advertisementsRouter";
import { Conversation } from "twilio/lib/twiml/VoiceResponse";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";

{
  /* page 59 XD */
}

const paths = [
  { url: UNIDESK_URL, label: "Unidesk" },
  { url: "", label: "inbox" },
] as BreadcrumbPath[];

const CaixaEntrada = () => {
  const { t } = useTranslation();
  const { userAppMode } = useGetUserType();

  return (
    <div className="h-full rounded-xl border lg:border-none">
      <>
        <div className="my-16 rounded-2xl lg:w-full ">
          <Breadcrumbs icon={iconfavorito} paths={paths} />
        </div>
        <BreadcrumbMiddle title={t("inbox")} icon={IconCaixa} />
        <UnideskStructure>
          <UnideskStructure.Menu>
            {userAppMode === "TENANT" ? (
              <MenuEstudante activeSection={"inbox"} activeUrl={"inbox"} />
            ) : userAppMode === "LANDLORD" ? (
              <MenuSenhorio activeSection={"inbox"} activeUrl={"inbox"} />
            ) : null}
          </UnideskStructure.Menu>
          {/* DESKTOP */}
          <ModalAnuncioInfoProvider>
            <ModalGerarReferenciaProvider>
              <>
                <ModalGerarReferencia />
                <ModalDetalhesPagamento />
                <CaixaExtradaContent />
              </>
            </ModalGerarReferenciaProvider>
          </ModalAnuncioInfoProvider>
        </UnideskStructure>
      </>
    </div>
  );
};

const CaixaExtradaContent = () => {
  const { t } = useTranslation();
  const [conversations, setConversations] = useState<ConversationComplete[]>([]);
  const [messages, setMessages] = useState<MessageWithProfile[]>([]);
  const [allMessages, setAllMessages] = useState<MessageWithProfile[]>([]);
  const profile = useCurrentUser();
  const { acceptReservation } = useReservationService();
  const { getMessagesFromConversationId, insertMessageOnConversation } = useMessagesService();
  const setModalGerarReferenciaInfo = useSetModalGerarReferenciaInfo();
  const setModalGerarRef = useSetModalGerarReferencia();
  const { getConversationsFromUser } = useConversationService();
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [currentConversation, setCurrentConversation] = useState<ConversationComplete | undefined>(undefined);
  const [currentConversationCompare, setCurrentConversationCompare] = useState<ConversationComplete | undefined>(
    undefined
  );
  const router = useRouter();
  const setIsOpen = useSetModalDetalhesPagamento();
  const setSearchLocationByProperty = useSetSearchLocationByProperty();
  const setAdvertisement = useSetSingleAdvertisement();
  const [selected, setSelected] = useState<boolean>(false);
  const [query, setQuery] = useState<boolean>(false);
  const [hasRunOnce, setHasRunOnce] = useState<boolean>(false);
  const [getMessages, setGetMessages] = useState<number>(0);
  const checkPayments = trpc.payments.checkPayment.useMutation();

  const getUserConversations = useCallback(async () => {
    if (profile) {
      // @ts-ignore
      const { data, error } = await getConversationsFromUser(profile[0].id);
      if (!error) {
        setConversations(data as unknown as ConversationComplete[]);
        setGetMessages(getMessages + 1);
      }

      if (conversations.length > 0 && !hasRunOnce) {
        setHasRunOnce(true);
        for (let conversation of conversations) {
          if (conversation.reservation.payment_status == "PENDING") {
            checkPayments.mutateAsync({
              advertisementId: conversation.reservation.advertisement_id,
              reservationId: conversation.reservation_id,
            });
          }
        }
      }
    }
  }, [profile, conversations]);

  const getAllMessages = async () => {
    let messages = [];
    if (conversations != null) {
      for (let conversation of conversations) {
        const { data, error } = await getMessagesFromConversationId(conversation.id);
        messages.push(data);
      }

      setAllMessages(messages as unknown as MessageWithProfile[]);
    }
  };

  const openPaymentModal = (reservation: any, value: number) => {
    setModalGerarReferenciaInfo({ reservation: reservation, value: value });
    setModalGerarRef(true);
  };

  const openDetailsModal = (advertisement: any, start_date: string, end_date: string, guest_number: number) => {
    setSearchLocationByProperty("startDate", new Date(start_date));
    setSearchLocationByProperty("endDate", new Date(end_date));
    setSearchLocationByProperty("monthRent", advertisement.month_rent);
    setSearchLocationByProperty("extra_per_host", advertisement.extra_per_host);
    setSearchLocationByProperty("semester_discount", advertisement.semester_discount);
    setSearchLocationByProperty("guest_number", guest_number);
    setSearchLocationByProperty("trimester_discount", advertisement.trimester_discount);
    setSearchLocationByProperty("guarantee_value", advertisement.guarantee_value);
    setAdvertisement(advertisement);
    setIsOpen(true);
  };

  const getMessagesFromConversation = useCallback(async () => {
    if (currentConversation && currentConversation != currentConversationCompare) {
      const { data, error } = await getMessagesFromConversationId(currentConversation.id);
      if (!error) {
        setMessages(data as MessageWithProfile[]);
        setCurrentConversationCompare(currentConversation);
      }
    }
  }, [currentConversation, currentConversationCompare, setCurrentConversationCompare]);

  const getConversationsTests = async () => {
    for (let conversation of conversations) {
      if (conversation.reservation.status == "REQUESTED" || conversation.reservation.status == "CHANGE_REQUESTED") {
        let updateDate = parseISO(conversation.reservation.updated_at);
        let date = new Date();

        if (differenceInCalendarDays(date, updateDate) > 2) {
          const { data, error } = await acceptReservation(conversation.reservation_id, "EXPIRED");
        }
      }
    }
  };

  function clickElementWithId(id: string): void {
    const element = document.getElementById(id);

    if (element) {
      element.click();
    } else {
      console.error(`Element with ID ${id} not found`);
    }

    setQuery(true);
  }

  useEffect(() => {
    if (getMessages == 0 && profile) {
      getUserConversations();
      getConversationsTests();
    }
    getMessagesFromConversation();

    if (!query && conversations.length > 0) {
      const { id } = router.query;

      if (id) {
        clickElementWithId(id as string);
      }
    }
  }, [getMessagesFromConversation, getConversationsTests, getUserConversations]);

  const sendMessage = async (event: React.FormEvent, conversationId: string) => {
    event.preventDefault();
    if (!currentMessage || !conversationId || !profile || currentMessage == "") return;

    // @ts-ignore
    const { data, error } = await insertMessageOnConversation(currentMessage, conversationId, profile[0].id);
    if (!error) {
      setMessages([...messages, data as MessageWithProfile]);
    }

    setCurrentMessage("");
  };

  const getOtherProfile = (conversation: ConversationComplete): Profile | undefined => {
    if (!profile) return;
    // @ts-ignore
    return conversation.host.id === profile[0].id ? conversation.tenant : conversation.host;
  };

  const updateReservationStatus = async (status: ReservationStatus) => {
    const { reservation } = currentConversation || { reservation: undefined };
    if (!reservation || !reservation.id || !currentConversation) return;

    const { error } = await acceptReservation(reservation.id, status);

    const { data: tenant } = await supabaseAdmin.from("profiles").select("*").eq("id", reservation.tenant_id).single();

    let included = "Despesas Incluídas";
    for (let expense of reservation.advertisement.expenses.services!) {
      if (expense.included == "PARTIALLY" && included == "INCLUDED") included = "Despesas Parcialmente incluídas";
      if (expense.included == "EXCLUDED") included = "Despesas excluídas";
    }
    
    let formData = {
      email: tenant.email,
      templateId: "d-df463b2a9a50409d842a761fc8b2b463",
      data: {
        first_name: tenant.name,
        accommodation_name: reservation.advertisement.title,
        reservation_occupation: reservation.number_guests,
        accommodation_address: `${reservation.advertisement.street} ${reservation.advertisement.street_number}, ${reservation.advertisement.postal_code} ${reservation.advertisement.place}`,
        entry_date: new Date(reservation.start_date).toLocaleDateString(),
        departure_date: new Date(reservation.end_date).toLocaleDateString(),
        monthly_value: reservation.advertisement.month_rent + reservation.advertisement.extra_per_host * reservation.number_guests,
        bills_conditions: included,
        link: `unidesk/inbox?id=${reservation.id}`,
      },
    };

    await fetch("/api/mail", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (!error) {
      setCurrentConversation({
        ...currentConversation,
        reservation: { ...reservation, status },
      });
    }
  };

  const clearConversation = () => {
    setCurrentConversation(undefined);
  };
  const conversationClickhandle = (conversation: any) => {
    setCurrentConversation(conversation);
    setSelected(true);
  };

  return (
    <>
      <div className={classNames("mx-auto hidden w-5/6 lg:block")}>
        {(!conversations || conversations.length === 0) && <div className="p-4">{t("no_conversations")}</div>}
        {conversations && conversations.length > 0 && (
          <>
            <div className="flex h-20 w-full items-center justify-between border-b border-terciary-500 align-middle">
              <a className="ml-8 rounded-md bg-primary-500 px-6 py-3 text-sm text-white">{t("admin:messages")}</a>

              <div className="mr-8 flex w-full items-center justify-end align-middle"></div>
              {currentConversation && <div className="w-1/3 border-l border-terciary-500 p-2"></div>}
            </div>

            <div className="flex flex-col">
              <div className="flex w-[100%] flex-row">
                <div
                  className="flex w-[30rem] flex-col overflow-y-scroll border-r border-terciary-500"
                  style={{ height: "40rem" }}
                  id="left-scroll"
                >
                  {conversations.map((conversation, index) => {
                    if (allMessages.length < 1) {
                    }
                    return (
                      <div
                        key={index}
                        onClick={() => setCurrentConversation(conversation)}
                        className={classNames("cursor-pointer p-1", {
                          "bg-primary-100": currentConversation?.id === conversation.id,
                        })}
                        id={conversation.reservation_id}
                      >
                        <CaixaCard
                          profile={getOtherProfile(conversation)}
                          messagerProfile={conversation.tenant}
                          // @ts-ignore
                          reservation={conversation.reservation}
                          // @ts-ignore
                          messages={allMessages[index]}
                        />
                      </div>
                    );
                  })}
                </div>

                <MessagesSenderZone
                  messages={messages}
                  conversationId={(currentConversation && currentConversation.id) || ""}
                  sendMessage={sendMessage}
                  currentMessage={currentMessage}
                  setCurrentMessage={setCurrentMessage}
                  reservationStatus={currentConversation?.reservation?.status!}
                />
                {currentConversation && (
                  <div className="popup w-[50%] border-l border-terciary-500 p-2">
                    <>
                      <div className="flex">
                        <div className="text-md font-bold text-primary-500">{t("reservation_details")}</div>
                        <ImCross className="my-auto ml-auto mr-2" onClick={clearConversation} />
                      </div>
                      <div className="p-2">
                        <div className="popup_div my-4 flex flex-col gap-3">
                          <div className="avatar_div mx-auto my-3 h-fit w-10">
                            <Avatar
                              img={getOtherProfile(currentConversation)?.avatar_url || "/icons/user/user.svg"}
                              rounded={true}
                              status="away"
                              size=""
                              statusPosition="bottom-right"
                            />
                          </div>
                          <div className="pl-2 text-start">
                            <div
                              className={classNames("font-bold", {
                                "text-yellow-500": currentConversation.reservation.status === "REQUESTED",
                                "text-green-500": currentConversation.reservation.status === "ACCEPTED",
                                "text-red-500": currentConversation.reservation.status === "REJECTED",
                                "text-gray-400": currentConversation.reservation.status === "EXPIRED",
                              })}
                            >
                              {(currentConversation.reservation.status &&
                                t(ReservationStatusLabel[currentConversation.reservation.status])) ||
                                ""}
                            </div>
                            <div
                              className="cursor-pointer text-sm"
                              onClick={() =>
                                router.push(`/anuncio/${currentConversation.reservation.advertisement.slug}`)
                              }
                            >
                              {currentConversation.reservation.advertisement &&
                                `${t(TYPE_ADVERTISEMENT[currentConversation.reservation.advertisement?.type])} em
                        ${currentConversation.reservation.advertisement?.place}`}
                            </div>
                            <div className="my-4 flex flex-col justify-start text-left text-sm">
                              {`${t("common:on_date", {
                                val: new Date(currentConversation.reservation?.start_date),
                                formatParams: {
                                  val: { day: "numeric", month: "short" },
                                },
                              })} - ${t("common:on_date", {
                                val: new Date(currentConversation.reservation?.end_date),
                                formatParams: {
                                  val: { day: "numeric", year: "numeric", month: "short" },
                                },
                              })}`}
                              <br />
                              <br />
                              {`${
                                currentConversation.reservation.number_guests != 1
                                  ? t("common:guests", { val: currentConversation.reservation.number_guests })
                                  : t("common:guest")
                              } - ${currentConversation.reservation.advertisement.month_rent}€`}
                              <br />
                              {`(${t("common:monthly_rent")})`}
                              <br />
                              <div>
                                <span
                                  className="text-start text-sm text-gray-500 underline"
                                  onClick={() =>
                                    openDetailsModal(
                                      currentConversation.reservation.advertisement,
                                      currentConversation.reservation.start_date,
                                      currentConversation.reservation.end_date,
                                      currentConversation.reservation.number_guests
                                    )
                                  }
                                >
                                  Detalhes de Pagamento
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {currentConversation.reservation.status === "REQUESTED" &&
                          // @ts-ignore
                          currentConversation.host_id == profile[0]?.id && (
                            <div className="flex flex-col justify-around gap-3">
                              <Button onClick={() => updateReservationStatus("ACCEPTED")} type="button">
                                {t("accept")}
                              </Button>
                              <Button onClick={() => updateReservationStatus("REJECTED")} type="button">
                                {t("decline")}
                              </Button>
                            </div>
                          )}
                        {currentConversation.reservation.status === "CHANGE_REQUESTED" &&
                          // @ts-ignore
                          currentConversation.host_id == profile[0]?.id && (
                            <div className="flex flex-col justify-around gap-3">
                              <Button onClick={() => updateReservationStatus("CHANGE_ACCEPTED")} type="button">
                                {t("accept")}
                              </Button>
                              <Button onClick={() => updateReservationStatus("CHANGE_REQUESTED")} type="button">
                                {t("decline")}
                              </Button>
                            </div>
                          )}

                        {
                          // @ts-ignore
                          currentConversation.host_id != profile[0]?.id &&
                            currentConversation.reservation.status == "ACCEPTED" &&
                            currentConversation.reservation.payment_status != "PAID" && (
                              <div
                                className="m-auto w-2/3 cursor-pointer rounded border border-primary-500 py-1 text-center"
                                onClick={() =>
                                  openPaymentModal(
                                    currentConversation.reservation,
                                    currentConversation.reservation.advertisement.month_rent
                                  )
                                }
                              >
                                {t("messages:payment")}
                              </div>
                            )
                        }

                        <div className="mx-auto mt-3 w-fit rounded-md bg-primary-500 px-4 py-2 text-center text-sm text-white">
                          {
                            // @ts-ignore
                            profile[0].id == currentConversation.host_id ? (
                              <Link href={`/perfil/${currentConversation.tenant.slug}`}>{t("show_profile")}</Link>
                            ) : (
                              <Link href={`/perfil/${currentConversation.host.slug}`}>{t("show_profile")}</Link>
                            )
                          }
                        </div>
                      </div>
                    </>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="block lg:hidden">
        <div className="flex h-20 w-full items-center justify-between border-b border-terciary-500 align-middle">
          <a
            className="ml-8 rounded-md bg-primary-500 px-6 py-3 text-white"
            onClick={() => setCurrentConversation(undefined)}
          >
            {t("admin:messages")}
          </a>

          <div className="mr-8 flex w-full items-center justify-end align-middle"></div>
        </div>
        {(!conversations || conversations.length === 0) && <div className="p-4">{t("no_conversations")}</div>}
        {conversations && selected && currentConversation && (
          <div className="flex justify-normal border-b border-terciary-500 p-5">
            <div onClick={() => setSelected(false)} className="mr-5 flex justify-center pt-2">
              <IoArrowBackOutline style={{ fontSize: "24px" }} />
            </div>
            <div>
              {profile && (
                <Link
                  href={
                    // @ts-ignore
                    profile[0].id === currentConversation.host_id
                      ? `/perfil/${currentConversation.tenant.slug}`
                      : `/perfil/${currentConversation.host.slug}`
                  }
                >
                  <Avatar
                    alt="Hóspede"
                    img={getOtherProfile(currentConversation)?.avatar_url || "/icons/user/user.svg"}
                    rounded={true}
                    size="md"
                  />
                </Link>
              )}
            </div>
            <div className="ml-3">
              <div
                className={classNames("font-bold", {
                  "text-yellow-500": currentConversation.reservation.status === "REQUESTED",
                  "text-green-500": currentConversation.reservation.status === "ACCEPTED",
                  "text-red-500": currentConversation.reservation.status === "REJECTED",
                  "text-gray-400": currentConversation.reservation.status === "EXPIRED",
                })}
              >
                {(currentConversation.reservation.status &&
                  t(ReservationStatusLabel[currentConversation.reservation.status])) ||
                  ""}
              </div>
              <div className="mt-2 text-xs font-bold">{getOtherProfile(currentConversation)?.name || ""}</div>
              <div
                className="mt-2 cursor-pointer text-sm"
                onClick={() => router.push(`/anuncio/${currentConversation.reservation.advertisement.slug}`)}
              >
                {currentConversation.reservation.advertisement &&
                  `${t(TYPE_ADVERTISEMENT[currentConversation.reservation.advertisement?.type])} em
                        ${currentConversation.reservation.advertisement?.place}`}
              </div>
              <div className="mt-2 flex flex-col justify-start text-left text-sm">
                {`${t("common:on_date", {
                  val: new Date(currentConversation.reservation?.start_date),
                  formatParams: {
                    val: { day: "numeric", month: "short" },
                  },
                })} - ${t("common:on_date", {
                  val: new Date(currentConversation.reservation?.end_date),
                  formatParams: {
                    val: { day: "numeric", year: "numeric", month: "short" },
                  },
                })}`}
              </div>
              <div>
                <span
                  className="text-start text-sm text-gray-500 underline"
                  onClick={() =>
                    openDetailsModal(
                      currentConversation.reservation.advertisement,
                      currentConversation.reservation.start_date,
                      currentConversation.reservation.end_date,
                      currentConversation.reservation.number_guests
                    )
                  }
                >
                  Detalhes de Pagamento
                </span>
              </div>
              <div>
                {
                  // @ts-ignore
                  currentConversation.host_id != profile[0]?.id &&
                    currentConversation.reservation.status == "ACCEPTED" &&
                    currentConversation.reservation.payment_status != "PAID" && (
                      <div
                        className="mt-2 w-2/3 cursor-pointer rounded border border-primary-500 py-1 text-center"
                        onClick={() =>
                          openPaymentModal(
                            currentConversation.reservation,
                            currentConversation.reservation.advertisement.month_rent
                          )
                        }
                      >
                        {t("messages:payment")}
                      </div>
                    )
                }
              </div>
            </div>
          </div>
        )}
        {conversations && (
          <div>
            {conversations?.map((conversation, index) => {
              if (allMessages.length < 1) {
                if (!hasRunOnce) {
                  setHasRunOnce(true);
                  getAllMessages();
                }
              }
              return (
                <>
                  {!selected && (
                    <div
                      key={index}
                      onClick={() => conversationClickhandle(conversation)}
                      className={classNames("w-full cursor-pointer border p-1 last:rounded-b-xl", {
                        "bg-primary-100": currentConversation?.id && currentConversation.id === conversation.id,
                      })}
                    >
                      <CaixaCard
                        profile={getOtherProfile(conversation)}
                        messagerProfile={conversation.tenant}
                        // @ts-ignore
                        reservation={conversation.reservation}
                        // @ts-ignore
                        messages={allMessages[index]}
                      />
                    </div>
                  )}
                </>
              );
            })}
            {currentConversation && (
              <div className={selected ? "lg:block" : "hidden lg:block"}>
                <MessagesSenderZone
                  messages={messages}
                  sendMessage={sendMessage}
                  conversationId={currentConversation && currentConversation.id}
                  currentMessage={currentMessage}
                  setCurrentMessage={setCurrentMessage}
                  reservationStatus={currentConversation.reservation.status}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
interface MessagesSenderZoneProps {
  messages: MessageWithProfile[];
  sendMessage: (e: React.FormEvent, conversationId: string) => void;
  currentMessage: string;
  setCurrentMessage: (e: any) => void;
  conversationId: string;
  reservationStatus: string;
}

const MessagesSenderZone = ({
  messages,
  sendMessage,
  currentMessage,
  setCurrentMessage,
  conversationId,
  reservationStatus,
}: MessagesSenderZoneProps) => {
  const { t } = useTranslation();
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Scroll to the bottom of the chat container when new messages are added
    const chatContainer = chatContainerRef.current as HTMLDivElement | null;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);
  return (
    <div
      className="flex flex-col gap-2"
      style={{ height: "40rem", overflowY: "auto", width: "-webkit-fill-available" }}
    >
      <div
        className="flex h-96 flex-col gap-1 overflow-y-auto p-2 "
        style={{ height: "-webkit-fill-available" }}
        id="right-scroll"
        ref={chatContainerRef}
      >
        {conversationId != "" && (
          <div className="my-2 text-center text-gray-400 underline">
            {reservationStatus == "ACCEPTED"
              ? t("messages:reservation_accepted")
              : reservationStatus == "REQUESTED"
              ? t("messages:default_message")
              : reservationStatus == "REJECTED"
              ? t("messages:reservation_rejected")
              : ""}
          </div>
        )}

        {messages.map((message, index, array) => {
          return <Mensagem key={index} message={message} previousMessage={array[index - 1]} />;
        })}
      </div>

      <div className="-between flex w-full items-center border-t border-terciary-500 pr-4 align-middle">
        <div className="mr-2 w-full">
          <form onSubmit={(e) => sendMessage(e, conversationId)} className="flex items-center">
            <input
              className="w-full border-0 p-4 text-xs outline-0 focus:ring-0"
              placeholder={t("write_message")}
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
            />
            <input type="submit" className="hidden" />
            <div
              className="rounded-full bg-primary-400 p-2"
              onClick={(e) => {
                e.preventDefault();
                sendMessage(e, conversationId);
              }}
            >
              <IoSend color="white" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CaixaEntrada;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale;
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: `auth/login`,
        permanent: false,
        locale: locale,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
