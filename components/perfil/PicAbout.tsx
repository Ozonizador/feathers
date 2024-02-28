import React from "react";
import { Avatar } from "flowbite-react";
import { Profile } from "../../models/profile";
import { useTranslation } from "next-i18next";
import PerfilInfo from "./PerfilInfo";

interface PicAboutProps {
  profile: Profile;
}

const PicAbout = ({ profile }: PicAboutProps) => {
  const { t } = useTranslation();

  return (
    <>
      <section className="mb-10">
        <div className="flex w-full items-center justify-center  align-middle lg:flex-row lg:justify-between">
          <div className="flex" id="profile-img">
            <label htmlFor="files" className="relative cursor-pointer rounded-md bg-white">
              <Avatar
                img={profile?.avatar_url || "/images/profile-pic.png"}
                rounded={true}
                size="xl"
                statusPosition="bottom-right"
              />
            </label>
            <PerfilInfo profile={profile} />
          </div>
        </div>
        {profile.description && (
          <div>
            <h3 className="mt-12 text-xl ml-2 mb-2 font-bold">{t("admin:about_me")}</h3>
            <div className="mb-6 block w-full rounded-md border border-solid border-terciary-500 bg-white px-2 py-5 shadow-sm">
              {profile.description}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default PicAbout;
