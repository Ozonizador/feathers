import React from "react";
import { Avatar } from "flowbite-react";
import { Profile } from "../../models/profile";

interface PicAboutProps {
  profile: Profile;
}

const PicAbout = ({ profile }: PicAboutProps) => {
  const returnGenderPronoum = () => {
    return profile?.gender == 2 ? "da" : "do";
  };

  return (
    <>
      <section className="mb-10">
        <h1 className="mb-14 text-center text-5xl font-semibold lg:text-left">
          Perfil {returnGenderPronoum()} {profile.name}
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

          <div className="mt-1 mb-6 block w-full rounded-md border border-solid border-terciary-500 bg-white py-5 px-2 shadow-sm">
            {profile.description}
          </div>
        </div>
      </section>
    </>
  );
};

export default PicAbout;
