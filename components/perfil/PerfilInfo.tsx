import React from "react";
import Image from "next/image";
import { Profile } from "../../models/profile";

interface PerfilIntoProps {
  profile: Profile;
}

const PerfilInfo = ({ profile }: PerfilIntoProps) => {
  return (
    <div className="flex w-full flex-col justify-end">
      <div className="flex flex-row items-center justify-end align-middle">
        <div>
          <h2 className="mr-3">É de Lisboa, Portugal</h2>
        </div>
        <div>
          <Image src="/images/icon-perfil-pin.png" alt="" height={56} width={56} />
        </div>
      </div>

      <div className="my-6 flex flex-row items-center justify-end align-middle">
        <div>
          <h2 className="mr-3">Fala português, inglês e espanhol</h2>
        </div>
        <div>
          <Image src="/images/icon-perfil-world-pin.png" alt="" height={56} width={56} />
        </div>
      </div>
    </div>
  );
};

export default PerfilInfo;
