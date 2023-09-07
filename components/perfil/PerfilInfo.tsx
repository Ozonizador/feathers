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
    <div className="flex w-full flex-col justify-end">
      <div className="flex flex-row items-center justify-end align-middle">
        <div>
          <h2 className="mr-3">
            É de {profile.town} {countryList().getLabel(profile.nationality || "")}
          </h2>
        </div>
        <div>
          <Image src="/images/icon-perfil-pin.png" alt="" height={56} width={56} />
        </div>
      </div>

      <div className="my-6 flex flex-row items-center justify-end align-middle">
        <div className="mr-3">
          {profile.languages && profile.languages.length > 0 ? (
            <h2>
              {t("admin:speaks")} {getUserLanguages()}
            </h2>
          ) : (
            <h2>{t("no_languages")}</h2>
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
