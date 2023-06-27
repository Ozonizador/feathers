import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { Session, User } from "@supabase/auth-helpers-react";
import classNames from "classnames";
import { Avatar, Select } from "flowbite-react";
import { GetServerSidePropsContext } from "next";
import React, { useState, useMemo, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import Breadcrumbs, { BreadcrumbPath } from "../../components/utils/Breadcrumbs";
import FeatherDatePicker from "../../components/utils/FeatherDatepicker";
import Input from "../../components/utils/Input";
import Select2 from "react-select";
import {
  Profile,
  Gender,
  ProfilesResponse,
  PROFILE_COLUMNS,
  PROFILE_TABLE_NAME,
  getSpokenLanguages,
} from "../../models/profile";
import useProfileService from "../../hooks/useProfileService";
import { dateToFormat } from "../../utils/utils";

import "react-phone-number-input/style.css";
import { ADMIN_URL } from "../../models/paths";
import { customStyles } from "../../components/admin/general.config";

const paths = [
  { url: ADMIN_URL, label: "Conta" },
  { url: "", label: "Informações pessoais" },
] as BreadcrumbPath[];

type ProfileEdition = {
  name: string;
  surname: string;
  gender: number;
  phone: string;
  town: string;
  nationality: string;
  description: string;
  birth_date: Date;
  languages: string[];
};

interface IndexProps {
  initialSession: Session;
  user: User;
  profileData: Profile;
}

const Index = ({ user, profileData }: IndexProps) => {
  const fileRef = useRef(null);
  const { addAvatar, updateUserProfile } = useProfileService();
  const [profile, setProfile] = useState<Profile>(profileData);

  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<ProfileEdition>({
    defaultValues: {
      name: profile?.name || "",
      surname: profile?.surname || "",
      gender: profile?.gender || 1,
      phone: profile?.phone || "",
      town: profile?.town || "",
      nationality: profile?.nationality || "PT",
      description: profile?.description || "",
      birth_date: profile?.birth_date ? new Date(profile.birth_date) : new Date(),
      languages: profile?.languages || [],
    },
  });

  const onSubmit = async ({
    name,
    surname,
    gender,
    phone,
    town,
    nationality,
    description,
    birth_date,
    languages,
  }: ProfileEdition) => {
    const { error } = await updateUserProfile(user.id, {
      ...profile,
      name,
      surname,
      gender,
      phone,
      town,
      nationality,
      description,
      birth_date: dateToFormat(birth_date),
      languages,
    });

    if (!error) {
      toast.success("OK");
    }
  };

  /* Country */
  const options = useMemo(() => countryList().getData(), []);

  /* Avatar */
  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.target.files) {
      let file = event.target.files[0] as File;
      const { data, error } = await addAvatar(profile.id, file.name, file);
      if (!error) {
        setProfile({ ...profile, avatar_url: data });
      }
    }
  };

  return (
    <div className="mx-auto mb-20 w-full sm:container lg:w-10/12">
      <Breadcrumbs paths={paths} />
      <div className="flex flex-1 justify-center">
        <form
          className="w-full rounded-2xl border border-terciary-700 bg-terciary-300 p-10 lg:px-32"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-center text-2xl font-bold lg:text-left lg:text-3xl">Informações pessoais</div>
          <div className="mb-5 mt-5">
            <div className="flex items-center justify-center lg:justify-start">
              <label
                htmlFor="files"
                className="relative cursor-pointer rounded-full border border-primary-500 bg-white p-3 text-indigo-500"
              >
                <Avatar
                  img={profile?.avatar_url || "/images/user-general.png"}
                  rounded={true}
                  status="away"
                  size="lg"
                  statusPosition="bottom-right"
                />
              </label>
              <input
                type="file"
                id="files"
                ref={fileRef}
                onChange={(e) => uploadAvatar(e)}
                multiple
                accept="image/png, image/gif, image/jpeg"
                className="hidden"
              />
            </div>
            <h6
              className="mx-auto mt-2 cursor-pointer px-3 text-primary-500"
              onClick={() => (fileRef.current as any).click()}
            >
              Mudar foto
            </h6>
          </div>

          {/* LEFT SIDE */}
          <div className="flex flex-col justify-between gap-12 lg:flex-row">
            <div className="w-full lg:w-1/2">
              <div className="mb-10">
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input value={value} onChange={onChange} name="nome" labelText="Nome" />
                  )}
                  name="name"
                ></Controller>
              </div>
              <div className="mb-1">Data de nascimento</div>
              <div className="flex flex-row gap-4">
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FeatherDatePicker date={value} onChange={onChange} className="w-full" />
                  )}
                  name="birth_date"
                ></Controller>
              </div>

              <div className="my-10">
                <label className="mt-2 block">Nacionalidade</label>
                <Controller
                  control={control}
                  name="nationality"
                  render={({ field: { onChange, value } }) => (
                    <Select value={value} onChange={onChange}>
                      <option value="">Selecione uma nacionalidade</option>
                      {options.map((option, index) => {
                        return (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        );
                      })}
                    </Select>
                  )}
                ></Controller>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:mt-0 lg:w-1/2">
              <div className="mb-10">
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input value={value} onChange={onChange} name="Apelido" labelText="Apelido" />
                  )}
                  name="surname"
                />
              </div>

              <div className="my-10">
                <div className="mb-1">Género</div>
                <div className="flex flex-row gap-4">
                  <div className="flex-1">
                    <select
                      {...register("gender")}
                      className="w-full rounded-md border border-solid border-terciary-500 bg-white px-3 py-2"
                    >
                      <option value={Gender.female}>Feminino</option>
                      <option value={Gender.male}>Masculino</option>
                      <option value={Gender.other}>Outro</option>
                    </select>
                  </div>
                </div>
              </div>

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input onChange={onChange} value={value} name="localidade" labelText="Localidade" />
                )}
                name="town"
              ></Controller>
            </div>
          </div>

          <div className="mb-1">Sobre mim</div>
          <textarea
            {...register("description")}
            rows={5}
            className="mb-6 mt-1 block w-full rounded-md border border-solid border-terciary-500 bg-white px-2 py-3  shadow-sm"
            placeholder="Escreva aqui..."
          />

          {/* LÍNGUAS FALADAS */}
          <div className="mb-1">Línguas faladas</div>
          <div className="flex flex-row">
            <Controller
              control={control}
              name="languages"
              render={({ field: { onChange, value } }) => {
                const options = [...getSpokenLanguages()];

                return (
                  <Select2
                    placeholder="Adicionar línguas"
                    value={options.filter((option) => value.includes(option.value))}
                    onChange={(val) => onChange(val.map((c) => c.value))}
                    isMulti
                    options={options}
                    className="mr-3 flex w-full items-center rounded-xl bg-socials-gmail px-3 py-2 text-primary-500"
                    styles={customStyles}
                  />
                );
              }}
            ></Controller>
            {/* <div className="mr-5 flex flex-col gap-2 overflow-y-auto">
              {profile?.languages &&
                profile.languages.map((language) => {
                  return (
                    <>
                      <Toast>
                        <div className="ml-3 text-base font-normal">{LanguageLabel[language]}</div>
                        <Toast.Toggle />
                      </Toast>
                    </>
                  );
                })}
            </div> */}
          </div>

          {/* CONTATO TELEFONICO */}
          <div className="my-8">
            <div>Contacto telefónico</div>
            <div>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    defaultCountry="PT"
                    placeholder="Enter phone number"
                    value={value}
                    onChange={() => onChange}
                  />
                )}
                name="phone"
              ></Controller>
            </div>
          </div>

          <div className="my-8">
            <div>
              <div className="mt-1">
                <button
                  type="submit"
                  disabled={!isDirty}
                  className={classNames(
                    "mt-10 flex w-full items-center justify-center rounded-md bg-primary-500 px-9 py-4 text-center uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-44",
                    { "opacity-50": !isDirty }
                  )}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  const user = session.user;
  const { data: profile, error } = await supabase
    .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
    .select()
    .eq(PROFILE_COLUMNS.ID, user.id)
    .single();

  return {
    props: {
      initialSession: session,
      user: user,
      profileData: profile,
    },
  };
};
