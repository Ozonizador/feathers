import { BsFilterCircle } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import CaixaCard from "../../components/CaixaEntrada/CaixaCard/CaixaCard";
import { useProfileInformation } from "../../context/MainProvider";
import { useCallback, useEffect, useState } from "react";
import { getConversationsFromUser } from "../../services/conversationServicec";
import {
  getMessagesFromConversationId,
  insertMessageOnConversation,
} from "../../services/messageService";
import { Message } from "../../models/message";
import { Conversation } from "../../models/conversation";
import Mensagem from "../../components/CaixaEntrada/Mensagem/Mensagem";
import Breadcrumb from "../../components/CaixaEntrada/breadcrumbs/Breadcrumb";

{
  /* page 59 XD */
}
const CaixaEntrada = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const profile = useProfileInformation();

  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [currentConversation, setCurrentConversation] = useState<string>("");

  const getUserConversations = useCallback(async () => {
    if (profile) {
      const { data, error } = await getConversationsFromUser(profile.id);
      if (!error) {
        setConversations(data);
        setCurrentConversation(data[0].id);
      }
    }
  }, [profile]);

  const getMessagesFromConversation = useCallback(async () => {
    if (currentConversation) {
      const { data, error } = await getMessagesFromConversationId(currentConversation);
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

    const { data, error } = await insertMessageOnConversation(
      currentMessage,
      currentConversation,
      profile.id
    );
    if (!error) {
      setMessages([...messages, data]);
    }
  };

  useEffect(() => {
    getUserConversations();
  }, [getUserConversations]);

  return (
    <>
      <Breadcrumb />
      <div className="container mx-auto my-16 w-5/6 rounded-2xl border border-terciary-500 ">
        <div className="flex h-20 w-full items-center justify-between border-b  border-terciary-500 py-6 align-middle">
          <a className=" ml-8 rounded-md bg-primary-500 py-3 px-6 text-white">Mensagens</a>

          <div className="mr-8 flex w-4/5 items-center justify-end align-middle">
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
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="flex w-1/5 flex-col border-r border-terciary-500">
              <div className="p-1">
                {conversations.map((conversation, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setCurrentConversation(conversation.id)}
                      className="cursor-pointer"
                    >
                      <CaixaCard />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex max-h-screen w-full flex-col gap-2">
              <div className="flex flex-col gap-1 overflow-y-auto p-2">
                {messages.map((message, index) => {
                  return <Mensagem key={index} message={message} />;
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CaixaEntrada;
