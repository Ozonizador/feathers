import React, { useMemo } from "react";
import Image from "next/image";
import { LanguageLabel, Profile } from "../../models/profile";
import countryList from "react-select-country-list";
import { useTranslation } from "next-i18next";

interface PerfilIntoProps {
  profile: Profile;
}

const PerfilInfo = ({ profile }: PerfilIntoProps) => {
  const { t } = useTranslation();
  const getUserLanguages = () => {
    const languages =
      profile.languages?.map((language) => t(LanguageLabel[language as keyof typeof LanguageLabel])).join(", ") || [];
    return languages;
  };

  return (
    <div className="ml-3">
      <h1 className="mb-4 text-center text-5xl font-semibold lg:text-left">
        {t("admin:profile", { name: profile.name, context: profile.gender == 1 ? "male" : "female" })}
      </h1>
      <div className="flex flex-col items-start">
        <div className="flex pb-2 flex-row items-center align-middle">
          <div className="mr-2">
            <Image src="/images/icon-perfil-pin.png" alt="" height={32} width={32} />
          </div>
          <div>
            <h2 className="mr-3">
              {t("admin:is_from", { town: profile.town })} {countryList().getLabel(profile.nationality || "")}
            </h2>
          </div>
        </div>

        <div className="flex flex-row items-center align-middle">
          <div className="mr-2">
            <Image src="/images/icon-perfil-world-pin.png" alt="" height={32} width={32} />
          </div>
          <div className="mr-3">
            {profile.languages && profile.languages.length > 0 ? (
              <h2>
                {t("admin:speaks")} {getUserLanguages()}
              </h2>
            ) : (
              <h2>{t("no_languages")}</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilInfo;
