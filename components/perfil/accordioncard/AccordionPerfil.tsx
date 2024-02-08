import React from "react";
import { Accordion } from "flowbite-react";
import { CgHome } from "react-icons/cg";
import { TbBed } from "react-icons/tb";
import { Gender, Profile } from "../../../models/profile";
import { Advertisement } from "../../../models/advertisement";
import Link from "next/link";
import { useTranslation } from "next-i18next";
interface AccordionPerfilProps {
  profile: Profile & { advertisements: Advertisement[] };
}

function AccordionPerfil({ profile }: AccordionPerfilProps) {
  const { t } = useTranslation();
  return (
    <div className="mb-20">
      <Accordion alwaysOpen={true}>
        <Accordion.Panel>
          <Accordion.Title>
            <div className="flex items-center align-middle">
              <div className="mr-2 text-4xl">
                <CgHome />
              </div>
              <h1 className="text-base font-bold lg:text-xl">
                {t("admin:is_landlord_since", {
                  year: new Date(profile.created_at).getFullYear(),
                  context: profile.gender === Gender.female ? "female" : "male",
                })}
              </h1>
            </div>
          </Accordion.Title>
          <Accordion.Content>
            <h1 className="my-3 text-xl">{t("advertisementWithCount", { count: profile.advertisements.length })}</h1>
            <div className="h-fit sm:h-fit">
              <div className="grid h-full grid-cols-2 flex-wrap items-start gap-2 dark:text-white md:grid-cols-3 lg:flex">
                {profile.advertisements.map((advertisement, index) => {
                  if (index) {
                    return (
                      <Link href={`/anuncio/${advertisement.slug}`} className="relative items-start px-2 w-48 rounded-lg" key={advertisement.id}>
                        <div className="">
                          <img src={advertisement.photos[0].url} alt="" />
                          <p className="bold text-sm font-bold text-black">{advertisement.title}</p>
                        </div>
                        <></>
                      </Link>
                    );
                  }
                })}
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Panel>

      </Accordion>
    </div>
  );
}

export default AccordionPerfil;
