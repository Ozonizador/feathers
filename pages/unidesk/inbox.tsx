import CaixaCard from "../../components/CaixaEntrada/CaixaCard/CaixaCard";
import { useCurrentUser } from "../../context/MainProvider";
import React, { useCallback, useEffect, useState } from "react";
import useConversationService, { ConversationComplete } from "../../hooks/conversationService";
import useMessagesService from "../../hooks/messageService";
import { MessageWithProfile } from "../../models/message";
import Mensagem from "../../components/CaixaEntrada/Mensagem/Mensagem";
import { Avatar } from "flowbite-react";
import { ReservationStatus, ReservationStatusLabel } from "../../models/reservation";
import { TYPE_ADVERTISEMENT } from "../../models/advertisement";
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
import { IoSend } from "react-icons/io5";
import { formatWithOptions } from "date-fns/fp";
import { enGB, pt } from "date-fns/locale";
import Locale from "react-phone-number-input/locale/en.json";
import router from "next/router";

{
  /* page 59 XD */
}

const paths = [
  { url: UNIDESK_URL, label: "Unidesk" },
  { url: "", label: "inbox" },
] as BreadcrumbPath[];

const CaixaEntrada = () => {
  const { t } = useTranslation();
  const [conversations, setConversations] = useState<ConversationComplete[]>([]);
  const [messages, setMessages] = useState<MessageWithProfile[]>([]);
  const [allMessages, setAllMessages] = useState<MessageWithProfile[]>([]);
  const profile = useCurrentUser();
  const { acceptReservation } = useReservationService();
  const { getMessagesFromConversationId, insertMessageOnConversation } = useMessagesService();
  const { getConversationsFromUser } = useConversationService();

  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [currentConversation, setCurrentConversation] = useState<ConversationComplete | undefined>(undefined);
  const [currentConversationCompare, setCurrentConversationCompare] = useState<ConversationComplete | undefined>(
    undefined
  );

  const getUserConversations = useCallback(async () => {
    if (profile) {
      // @ts-ignore
      const { data, error } = await getConversationsFromUser(profile[0].id);
      if (!error) {
        setConversations(data as unknown as ConversationComplete[]);
      }
    }
  }, [profile]);

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

  useEffect(() => {
    getMessagesFromConversation();
    getConversationsTests();
  }, [getMessagesFromConversation, getConversationsTests]);

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

  useEffect(() => {
    getUserConversations();
  }, [getUserConversations]);

  const getOtherProfile = (conversation: ConversationComplete): Profile | undefined => {
    if (!profile) return;
    // @ts-ignore
    return conversation.host.id === profile[0].id ? conversation.tenant : conversation.host;
  };

  const updateReservationStatus = async (status: ReservationStatus) => {
    const { reservation } = currentConversation || { reservation: undefined };
    if (!reservation || !reservation.id || !currentConversation) return;

    const { error } = await acceptReservation(reservation.id, status);

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

  return (
    <div className="mx-5 h-full rounded-xl border lg:border-none">
      <>
        <div className="max-width my-20 rounded-2xl lg:container lg:my-20 lg:w-full ">
          <Breadcrumbs icon={iconfavorito} paths={paths} />
        </div>
        <BreadcrumbMiddle title={t("inbox")} icon={IconCaixa} />
        {/* DESKTOP */}
        <div className="mx-auto my-16 hidden w-5/6 rounded-2xl border border-terciary-500 lg:block ">
          {(!conversations || conversations.length === 0) && <div className="p-4">{t("no_conversations")}</div>}
          {conversations && conversations.length > 0 && (
            <>
              <div className="flex h-20 w-full items-center justify-between border-b border-terciary-500 align-middle">
                <a className="ml-8 rounded-md bg-primary-500 px-6 py-3 text-white">{t("admin:messages")}</a>

                <div className="mr-8 flex w-full items-center justify-end align-middle"></div>
                {currentConversation && <div className="w-1/3 border-l border-terciary-500 p-2"></div>}
              </div>  

              <div className="flex flex-col">
                <div className="flex flex-row">
                  <div className="flex w-96 flex-col border-r border-terciary-500 overflow-y-scroll" style={{ height: '40rem', minWidth: '285px'}} id="left-scroll">
                    {conversations.map((conversation, index) => {
                      if (allMessages.length < 1) {
                        getAllMessages();
                      }
                      return (
                        <div
                          key={index}
                          onClick={() => setCurrentConversation(conversation)}
                          className={classNames("cursor-pointer p-1", {
                            "bg-primary-100": currentConversation?.id === conversation.id,
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
                      );
                    })}
                  </div>

                  <MessagesSenderZone
                    messages={messages}
                    conversationId={(currentConversation && currentConversation.id) || ""}
                    sendMessage={sendMessage}
                    currentMessage={currentMessage}
                    setCurrentMessage={setCurrentMessage}
                  />
                  {currentConversation && (
                    <div className="border-l border-terciary-500 p-2" style={{minWidth: '17rem'}}>
                      <>
                        <div className="flex">
                          <div className="text-xl font-bold text-primary-500">{t("reservation_details")}</div>
                          <ImCross className="my-auto ml-auto mr-2" onClick={clearConversation} />
                        </div>
                        <div className="p-2">
                        <div className="my-4 flex flex-row gap-3">
                          <div>
                            <Avatar
                              img={getOtherProfile(currentConversation)?.avatar_url || "/icons/user/user.svg"}
                              rounded={true}
                              status="away"
                              size="md"
                              statusPosition="bottom-right"
                            />
                          </div>
                          <div className="pl-2 text-start">
                            <div className="font-bold">
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
                              <div className="my-4 flex justify-start text-left text-sm">
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
                        </div>
                          </div>
                        </div>
                        {/* {currentConversation?.reservation?.status && (
                            <div>{currentConversation.host_id == profile[0]?.id}</div>
                        )} */}

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
                        <div
                          className={classNames("my-1 text-center", {
                            "text-primary-500": ["ACCEPTED", "CHANGE_ACCEPTED"].includes(
                              currentConversation.reservation.status
                            ),
                          })}
                        >
                          {t(
                            ReservationStatusLabel[
                              currentConversation.reservation.status as keyof typeof ReservationStatusLabel
                            ]
                          )}
                          </div>
                          {/* ======= */}
                        <div className="rounded-md px-4 bg-primary-500 w-fit py-2 text-white text-center mx-auto mt-3">
                          <Link href={`/perfil/${currentConversation.tenant.slug}`}>{t("show_profile")}</Link>
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
            {currentConversation && <div className="w-1/3 border-l border-terciary-500 p-2"></div>}
          </div>
          {(!conversations || conversations.length === 0) && <div className="p-4">{t("no_conversations")}</div>}
          {conversations && (
            <div>
              {currentConversation &&
                conversations?.map((conversation, index) => {
                  if (allMessages.length < 1) {
                    getAllMessages();
                  }
                  return (
                    <div
                      key={index}
                      onClick={() => setCurrentConversation(conversation)}
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
                  );
                })}
              {currentConversation && (
                <div className="tests">
                  <MessagesSenderZone
                    messages={messages}
                    sendMessage={sendMessage}
                    conversationId={currentConversation && currentConversation.id}
                    currentMessage={currentMessage}
                    setCurrentMessage={setCurrentMessage}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </>
    </div>
  );
};

interface MessagesSenderZoneProps {
  messages: MessageWithProfile[];
  sendMessage: (e: React.FormEvent, conversationId: string) => void;
  currentMessage: string;
  setCurrentMessage: (e: any) => void;
  conversationId: string;
}

const MessagesSenderZone = ({
  messages,
  sendMessage,
  currentMessage,
  setCurrentMessage,
  conversationId,
}: MessagesSenderZoneProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col gap-2" style={{ height: '40rem'}}>
      <div className="flex h-96 flex-col gap-1 overflow-y-auto p-2" style={{ height: '-webkit-fill-available'}} id='right-scroll'>
        {messages.map((message, index, array) => {
          return <Mensagem key={index} message={message} previousMessage={array[index - 1]} />;
        })}
      </div>

      <div className="-between flex w-full items-center border-t border-terciary-500 pr-4 align-middle">
        <div className="mr-2 w-full">
          <form onSubmit={(e) => sendMessage(e, conversationId)} className="flex items-center">
            <input
              className="w-full border-0 p-4 text-xs outline-0"
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
