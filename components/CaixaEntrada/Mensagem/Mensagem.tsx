import classNames from "classnames";
import { Avatar } from "flowbite-react";
import { useCurrentUser } from "../../../context/MainProvider";
import { MessageWithProfile } from "../../../models/message";
interface MessageProps {
  message: MessageWithProfile;
  previousMessage: MessageWithProfile | null;
}

const Mensagem = ({ message, previousMessage }: MessageProps) => {
  const currentUser = useCurrentUser();
  if (!message) return <></>;

  const profile = message.profile;
  return (
    <>
      <div
        className={classNames("ml-2 flex", {
          // @ts-ignore
          "justify-end": message.profile_id === currentUser[0]?.id,
          // @ts-ignore
          "justify-start": message.profile_id !== currentUser[0]?.id,
        })}
      >
        <div className="w-1/2">
          <div className="flex w-full flex-row items-center align-middle">
            {previousMessage?.profile_id !== message.profile_id && (
              <div
                className={classNames("flex w-full flex-row align-middle", {
                  // @ts-ignore
                  "mr-2 justify-end": message.profile_id === currentUser[0]?.id,
                  // @ts-ignore
                  "ml-2 justify-start": message.profile_id !== currentUser[0]?.id,
                })}
              >
                <Avatar alt="Hóspede" img={profile?.avatar_url || "/icons/user/user.svg"} rounded={true} size="sm" />
              </div>
            )}

            {previousMessage && previousMessage.profile_id !== message.profile_id && (
              <div className="flex w-full flex-row justify-between text-xs">
                <div>{message.profile?.name || ""}</div>
                <div>{new Date(message.created_at).toDateString()}</div>
              </div>
            )}
          </div>

          <div
            className={classNames("ml-4 mt-1 rounded-md p-4 text-xs", {
              // @ts-ignore
              "bg-neutral-300 text-black": message.profile_id === currentUser[0]?.id,
              // @ts-ignore
              "bg-primary-500 text-white": message.profile_id !== currentUser[0]?.id,
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
