import { BsFilterCircle } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import CaixaCard from "../../components/CaixaEntrada/CaixaCard/CaixaCard";
import { useProfileInformation } from "../../context/MainProvider";
import { useCallback, useEffect, useState } from "react";
import { getConversationsFromUser } from "../../services/conversationService";
import { getMessagesFromConversationId, insertMessageOnConversation } from "../../services/messageService";
import { Message } from "../../models/message";
import { Conversation, ConversationWithTenant } from "../../models/conversation";
import Mensagem from "../../components/CaixaEntrada/Mensagem/Mensagem";
import Breadcrumb from "../../components/CaixaEntrada/breadcrumbs/Breadcrumb";
import { Avatar } from "flowbite-react";
import { ReservationStatus, ReservationStatusLabel } from "../../models/reservation";
import { TYPE_ADVERTISEMENT } from "../../models/advertisement";
import { ImCross } from "react-icons/im";

{
  /* page 59 XD */
}
const CaixaEntrada = () => {
  const [conversations, setConversations] = useState<ConversationWithTenant[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const profile = useProfileInformation();

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

  const updateReservationStatus = (status: ReservationStatus) => {};

  const clearConversation = () => {
    setCurrentConversation(null);
  };

  const formatDate = (date: Date) => {
    if (!date) return "";

    const newDate = new Date(date);
    return newDate.toLocaleString("default", {
      day: "numeric",
      month: "long",
    });
  };

  return (
    <>
      <Breadcrumb />
      <div className="mx-auto my-16 w-5/6 rounded-2xl border border-terciary-500 ">
        <div className="flex h-20 w-full items-center justify-between border-b  border-terciary-500 align-middle">
          <a className=" ml-8 rounded-md bg-primary-500 py-3 px-6 text-white">Mensagens</a>

          <div className="mr-8 flex w-full items-center justify-end align-middle">
            <div>
              <a>
                <GoSearch className="text-xl" />
              </a>
            </div>

            <div>
              <a className="ml-8 flex flex-row items-center justify-center rounded-md bg-primary-500 py-3 px-6 text-white">
                <BsFilterCircle className="mr-2 text-xl" />
                Filter
              </a>
            </div>
          </div>
          {currentConversation && <div className="w-1/3 border-l border-terciary-500 p-2"></div>}
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="flex w-1/5 flex-col border-r border-terciary-500">
              <div className="p-1">
                {conversations.map((conversation, index) => {
                  return (
                    <div key={index} onClick={() => setCurrentConversation(conversation)} className="cursor-pointer">
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
            {currentConversation && currentConversation.hostId === profile.id && (
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
                              currentConversation.tenant?.avatarUrl
                                ? currentConversation.tenant?.avatarUrl
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
                        {`${formatDate(currentConversation.reservation.startDate)} - ${formatDate(
                          currentConversation.reservation.endDate
                        )}`}
                      </div>
                      {currentConversation.reservation.status === ReservationStatus.REQUESTED && (
                        <div className="flex justify-around gap-5">
                          <button
                            className="bg-primary-500 p-2 text-white"
                            onClick={() => updateReservationStatus(ReservationStatus.ACCEPTED)}
                          >
                            Aceitar
                          </button>

                          <button
                            className="bg-neutral-300 p-2"
                            onClick={() => updateReservationStatus(ReservationStatus.REJECTED)}
                          >
                            Rejeitar
                          </button>
                        </div>
                      )}
                      {currentConversation.reservation.status === ReservationStatus.CHANGE_REQUESTED && (
                        <div className="flex justify-around">
                          <button
                            className="bg-primary-500 p-2 text-white"
                            onClick={() => updateReservationStatus(ReservationStatus.CHANGE_ACCEPTED)}
                          >
                            Aceitar
                          </button>

                          <button
                            className="bg-neutral-300 p-2"
                            onClick={() => updateReservationStatus(ReservationStatus.CHANGE_REQUESTED)}
                          >
                            Rejeitar
                          </button>
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
                    </>
                  )}
                  <div>Mostrar perfil de {currentConversation.tenant.name}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CaixaEntrada;
