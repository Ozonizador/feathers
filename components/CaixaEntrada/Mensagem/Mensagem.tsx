import classNames from "classnames";
import { Avatar } from "flowbite-react";
import { useCurrentUser } from "../../../context/MainProvider";
import { Message, MessageWithProfile } from "../../../models/message";

interface MessageProps {
  message: MessageWithProfile;
  previousMessage: MessageWithProfile | null;
}

const Mensagem = ({ message, previousMessage }: MessageProps) => {
  const currentUser = useCurrentUser();
  if (!message) return;

  const profile = message.profile;
  return (
    <>
      <div
        className={classNames("mt-4 ml-2 flex", {
          "justify-end": message.profile_id === currentUser.id,
          "justify-start": message.profile_id !== currentUser.id,
        })}
      >
        <div className="w-1/2">
          <div className="flex w-full flex-row items-center align-middle">
            <div
              className={classNames("flex w-full flex-row align-middle", {
                "mr-2 justify-end": message.profile_id === currentUser.id,
                "ml-2 justify-start": message.profile_id !== currentUser.id,
              })}
            >
              <Avatar alt="Hóspede" img={profile?.avatar_url || "/images/user.png"} rounded={true} size="sm" />
            </div>

            {previousMessage && previousMessage.profile_id !== message.profile_id && (
              <div className="flex w-full flex-row justify-between text-xs">
                <div>{message.profile?.name || ""}</div>
                <div>{new Date(message.created_at).toDateString()}</div>
              </div>
            )}
          </div>

          <div
            className={classNames("ml-4 mt-2 rounded-md p-4 text-xs text-white", {
              "bg-neutral-400": message.profile_id === currentUser.id,
              "bg-primary-500": message.profile_id !== currentUser.id,
            })}
          >
            {message.message}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mensagem;
