import CaixaCard from "../../components/CaixaEntrada/CaixaCard/CaixaCard";
import { useProfileInformation } from "../../context/MainProvider";
import { useCallback, useEffect, useState } from "react";
import useConversationService from "../../hooks/conversationService";
import useMessagesService from "../../hooks/messageService";
import { MessageWithProfile } from "../../models/message";
import { ConversationWithTenant } from "../../models/conversation";
import Mensagem from "../../components/CaixaEntrada/Mensagem/Mensagem";
import { Avatar } from "flowbite-react";
import { ReservationStatus, ReservationStatusLabel } from "../../models/reservation";
import { TYPE_ADVERTISEMENT } from "../../models/advertisement";
import { ImCross } from "react-icons/im";
import useReservationService from "../../hooks/reservationService";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import classNames from "classnames";
import { GetServerSidePropsContext } from "next";
import BreadcrumbMiddle from "../../components/utils/BreadcrumbMiddle";

import IconCaixa from "../../public/images/iconCaixa.svg";
import Button from "../../components/utils/Button";
import Link from "next/link";

{
  /* page 59 XD */
}
const CaixaEntrada = () => {
  const [conversations, setConversations] = useState<ConversationWithTenant[]>([]);
  const [messages, setMessages] = useState<MessageWithProfile[]>([]);
  const profile = useProfileInformation();
  const { updateReservationStatusOnDB } = useReservationService();
  const { getMessagesFromConversationId, insertMessageOnConversation } = useMessagesService();
  const { getConversationsFromUser } = useConversationService();

  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [currentConversation, setCurrentConversation] = useState<ConversationWithTenant>(null);

  const getUserConversations = useCallback(async () => {
    if (profile) {
      const { data, error } = await getConversationsFromUser(profile.id);
      if (!error) {
        setConversations(data);
      }
    }
  }, [profile]);

  const getMessagesFromConversation = useCallback(async () => {
    if (currentConversation) {
      const { data, error } = await getMessagesFromConversationId(currentConversation.id);
      if (!error) {
        setMessages(data);
      }
    }
  }, [currentConversation]);

  useEffect(() => {
    getMessagesFromConversation();
  }, [getMessagesFromConversation]);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!currentMessage || !currentConversation) return;

    const { data, error } = await insertMessageOnConversation(currentMessage, currentConversation.id, profile.id);
    if (!error) {
      setMessages([...messages, data]);
    }
  };

  useEffect(() => {
    getUserConversations();
  }, [getUserConversations]);

  const getOtherProfile = (conversation) => {
    return conversation.host.id === profile.id ? conversation.tenant : conversation.host;
  };

  const updateReservationStatus = async (status: ReservationStatus) => {
    const { reservation } = currentConversation;
    const { data, error } = await updateReservationStatusOnDB(reservation.id, status);

    if (!error) {
      setCurrentConversation({ ...currentConversation, reservation: data });
    }
  };

  const clearConversation = () => {
    setCurrentConversation(null);
  };

  return (
    <>
      <BreadcrumbMiddle title="Caixa de Entrada" icon={IconCaixa} />
      <div className="mx-auto my-16 w-5/6 rounded-2xl border border-terciary-500 ">
        {!conversations || (conversations.length === 0 && <div className="p-4">Não existem conversações</div>)}
        {conversations && conversations.length > 0 && (
          <>
            <div className="flex h-20 w-full items-center justify-between border-b border-terciary-500 align-middle">
              <a className=" ml-8 rounded-md bg-primary-500 py-3 px-6 text-white">Mensagens</a>

              <div className="mr-8 flex w-full items-center justify-end align-middle">
                {/* <div>
                  <a>
                    <GoSearch className="text-xl" />
                  </a>
                </div>

                <div>
                  <a className="ml-8 flex flex-row items-center justify-center rounded-md bg-primary-500 py-3 px-6 text-white">
                    <BsFilterCircle className="mr-2 text-xl" />
                    Filter
                  </a>
                </div> */}
              </div>
              {currentConversation && <div className="w-1/3 border-l border-terciary-500 p-2"></div>}
            </div>

            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="flex w-1/5 flex-col border-r border-terciary-500">
                  <div>
                    {conversations.map((conversation, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => setCurrentConversation(conversation)}
                          className={classNames("cursor-pointer p-1", {
                            "bg-primary-100": currentConversation?.id === conversation.id,
                          })}
                        >
                          <CaixaCard profile={getOtherProfile(conversation)} reservation={conversation.reservation} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex max-h-screen w-full flex-col gap-2">
                  <div className="flex h-96 flex-col gap-1 overflow-y-auto p-2">
                    {messages.map((message, index, array) => {
                      return <Mensagem key={index} message={message} previousMessage={array[index - 1]} />;
                    })}
                  </div>

                  <div className="mt-auto flex w-full flex-row items-center justify-between border-t border-terciary-500 pr-4 align-middle">
                    <div className="w-10/12">
                      <form onSubmit={(e) => sendMessage(e)}>
                        <input
                          className="w-full border-0 p-4 text-xs outline-0"
                          placeholder="Type a message..."
                          type="text"
                          value={currentMessage}
                          onChange={(e) => setCurrentMessage(e.target.value)}
                        />
                        <input type="submit" className="hidden" />
                      </form>
                    </div>
                    {/* OTHER OPTIONS - ANEX FILE, IMAGE ETC */}
                    {/* <div className="mt-5 flex gap-4">
                  <AiOutlinePicture className="text-xl text-slate-400" />
                  <FiPaperclip className="text-xl text-slate-400" />
                  <BiSmile className="text-xl text-slate-400" />
                </div>*/}
                  </div>
                </div>
                {currentConversation && currentConversation.host_id === profile.id && (
                  <>
                    <div className="w-1/3 border-l border-terciary-500 p-2">
                      {currentConversation && (
                        <>
                          <div className="flex">
                            <div className="text-xl font-bold text-primary-500">Detalhes da reserva</div>
                            <ImCross className="my-auto ml-auto mr-2" onClick={clearConversation} />
                          </div>
                          <div className="my-4 flex flex-row gap-3">
                            <div>
                              <Avatar
                                img={
                                  currentConversation.tenant?.avatar_url
                                    ? currentConversation.tenant?.avatar_url
                                    : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                }
                                rounded={true}
                                status="away"
                                size="md"
                                statusPosition="bottom-right"
                              />
                            </div>
                            <div>
                              <div>{ReservationStatusLabel[currentConversation.reservation.status]}</div>
                              <div className="text-sm">
                                {`${TYPE_ADVERTISEMENT[currentConversation.reservation.advertisement.type]} em
                        ${currentConversation.reservation.advertisement.place}`}
                              </div>
                            </div>
                          </div>
                          <div className="my-4 flex justify-center">
                            {`${currentConversation.reservation.start_date} - ${currentConversation.reservation.end_date}`}
                          </div>
                          {currentConversation.reservation.status === ReservationStatus.REQUESTED && (
                            <div className="flex justify-around gap-5">
                              <Button onClick={() => updateReservationStatus(ReservationStatus.ACCEPTED)} type="button">
                                Aceitar
                              </Button>
                              <Button onClick={() => updateReservationStatus(ReservationStatus.REJECTED)} type="button">
                                Aceitar
                              </Button>
                            </div>
                          )}
                          {currentConversation.reservation.status === ReservationStatus.CHANGE_REQUESTED && (
                            <div className="flex justify-around">
                              <Button
                                onClick={() => updateReservationStatus(ReservationStatus.CHANGE_ACCEPTED)}
                                type="button"
                              >
                                Aceitar
                              </Button>
                              <Button
                                onClick={() => updateReservationStatus(ReservationStatus.CHANGE_REQUESTED)}
                                type="button"
                              >
                                Aceitar
                              </Button>
                            </div>
                          )}
                          {currentConversation.reservation.status === ReservationStatus.ACCEPTED && (
                            <div className="text-primary-500">Reserva aceite</div>
                          )}
                          {currentConversation.reservation.status === ReservationStatus.REJECTED && (
                            <div>Reserva rejeitada</div>
                          )}
                          {currentConversation.reservation.status === ReservationStatus.CHANGE_ACCEPTED && (
                            <div className="text-primary-500">Alteração reserva aceite</div>
                          )}
                          {currentConversation.reservation.status === ReservationStatus.CHANGE_REJECTED && (
                            <div>Alteração reserva rejeitada</div>
                          )}

                          <Link href={`/perfil/${currentConversation.tenant.slug}`}>
                            <a className="text-small mt-2">
                              <div>Mostrar perfil de {currentConversation.tenant.name}</div>
                            </a>
                          </Link>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CaixaEntrada;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
