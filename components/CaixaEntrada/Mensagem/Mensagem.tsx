import classNames from "classnames";
import { Avatar } from "flowbite-react";
import { useProfileInformation } from "../../../context/MainProvider";
import { Message } from "../../../models/message";

interface MessageProps {
  message: Message;
}

const Mensagem = ({ message }: MessageProps) => {
  const profile = useProfileInformation();

  return (
    <>
      <div
        className={classNames("mt-4 ml-2 flex", {
          "justify-end": message.profileId === profile.id,
          "justify-start": message.profileId !== profile.id,
        })}
      >
        <div className="w-1/2">
          <div className="flex w-full flex-row items-center align-middle">
            <div className="flex w-16 flex-col items-center justify-center align-middle">
              {/* <Avatar
                alt="Hóspede"
                img="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                rounded={true}
                size="md"
              /> 
              */}
            </div>
            <div className="flex w-full flex-row justify-between text-xs">
              <div>Victor Roberts</div>
              <div>{new Date(message.createdAt).toDateString()}</div>
            </div>
          </div>

          <div className="ml-4 mt-2 rounded-md bg-primary-500 p-4 text-xs text-white">{message.message}</div>
        </div>
      </div>
    </>
  );
};

export default Mensagem;
