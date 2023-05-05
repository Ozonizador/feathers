import React from "react";
import Image from "next/image";
import { Accordion } from "flowbite-react";
import { CgHome } from "react-icons/cg";
import { TbBed } from "react-icons/tb";
import { Gender, Profile } from "../../../models/profile";
import { Advertisement } from "../../../models/advertisement";
import Link from "next/link";
interface AccordionPerfilProps {
  profile: Profile & { advertisements: Advertisement[] };
}

function AccordionPerfil({ profile }: AccordionPerfilProps) {
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
                {`${profile.gender === Gender.female ? "Senhoria" : "Senhorio"} Unihosts desde ${new Date(
                  profile.created_at
                ).getFullYear()}`}
              </h1>
            </div>
          </Accordion.Title>
          <Accordion.Content>
            <h1 className="my-3 text-xl">{profile.advertisements.length} anúncios</h1>
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
              <div className="grid h-full grid-cols-2 flex-wrap items-center gap-2 dark:text-white md:grid-cols-3 lg:flex">
                {profile.advertisements.map((advertisement) => {
                  return (
                    <article className="relative h-48 w-48 rounded-lg" key={advertisement.id}>
                      <div className="absolute bottom-4 left-2 z-50">
                        <p className="bold text-sm font-bold text-white">{advertisement.title}</p>
                        <Link href={`/anuncio/${advertisement.slug}`}>
                          <a className="bold text-sm text-white">Ver mais</a>
                        </Link>
                      </div>

                      <></>
                    </article>
                  );
                })}
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title>
            <div className="flex items-center align-middle">
              <div className="mr-2 text-4xl">
                <TbBed />
              </div>
              <h1 className="text-base font-bold lg:text-xl">{`É estudante unihosts desde ${new Date(
                profile.created_at
              ).getFullYear()}`}</h1>
            </div>
          </Accordion.Title>
          <Accordion.Content></Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}

export default AccordionPerfil;
