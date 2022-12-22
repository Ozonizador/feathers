import React from "react";
import Image from "next/image";
import { Profile } from "../../models/profile";

interface PerfilIntoProps {
  profile: Profile;
}

const PerfilInfo = ({ profile }: PerfilIntoProps) => {
  const getUserLanguages = () => {
    return profile.languages?.join(" , ");
  };

  return (
    <div className="flex w-full flex-col justify-end">
      <div className="flex flex-row items-center justify-end align-middle">
        <div>
          <h2 className="mr-3">
            É de {profile.town} {profile.nationality}
          </h2>
        </div>
        <div>
          <Image src="/images/icon-perfil-pin.png" alt="" height={56} width={56} />
        </div>
      </div>

      <div className="my-6 flex flex-row items-center justify-end align-middle">
        <div className="mr-3">
          {profile.languages && profile.languages.length > 0 ? (
            <h2>Fala {getUserLanguages()}</h2>
          ) : (
            <h2>Sem informação de linguas</h2>
          )}
        </div>
        <div>
          <Image src="/images/icon-perfil-world-pin.png" alt="" height={56} width={56} />
        </div>
      </div>
    </div>
  );
};

export default PerfilInfo;
