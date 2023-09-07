import React from "react";
import { Avatar } from "flowbite-react";
import { Profile } from "../../models/profile";
import { useTranslation } from "next-i18next";

interface PicAboutProps {
  profile: Profile;
}

const PicAbout = ({ profile }: PicAboutProps) => {
  const { t } = useTranslation();

  return (
    <>
      <section className="mb-10">
        <h1 className="mb-14 text-center text-5xl font-semibold lg:text-left">
          {t("admin:profile", { name: profile.name, context: profile.gender == 1 ? "male" : "female" })}
        </h1>

        <div className="flex w-full flex-col items-center justify-center  align-middle lg:flex-row lg:justify-between">
          <div>
            <label htmlFor="files" className="relative mr-48 cursor-pointer rounded-md bg-white">
              <Avatar
                img={profile?.avatar_url || "/images/profile-pic.png"}
                rounded={true}
                size="xl"
                statusPosition="bottom-right"
              />
            </label>
          </div>

          <div className="mb-6 mt-1 block w-full rounded-md border border-solid border-terciary-500 bg-white px-2 py-5 shadow-sm">
            {profile.description}
          </div>
        </div>
      </section>
    </>
  );
};

export default PicAbout;
