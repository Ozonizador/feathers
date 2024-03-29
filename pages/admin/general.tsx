import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { Session, User } from "@supabase/auth-helpers-react";
import classNames from "classnames";
import { Avatar, Select } from "flowbite-react";
import { GetServerSidePropsContext } from "next";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import Input, { parsePhoneNumber } from "react-phone-number-input/input";

import Breadcrumbs, { BreadcrumbPath } from "../../components/utils/Breadcrumbs";
import FeatherDatePicker from "../../components/utils/FeatherDatepicker";
import FeathersInput from "../../components/utils/Input";
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

import { ADMIN_URL } from "../../models/paths";
import { customStyles } from "../../components/admin/general.config";
import PhoneCountrySelect from "../../components/utils/PhoneInput";
import { CountryCode } from "libphonenumber-js/types";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const paths = [
  { url: ADMIN_URL, label: "account" },
  { url: "", label: "admin:config.general" },
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
  const { t } = useTranslation();
  const phoneNumber = profileData && profileData.phone && parsePhoneNumber(profileData.phone);

  const fileRef = useRef(null);
  const { addAvatar, updateUserProfile } = useProfileService();
  const [profile, setProfile] = useState<Profile>(profileData);
  const [country, setCountry] = useState((phoneNumber && phoneNumber.country) || "PT");

  useEffect(() => {
    const handleLoad = () => {
      if (!(profile.name && profile.surname && profile.town && profile.phone)) {
        toast.warning(t("account:fill"));
      }
    };

    // Add event listener for onLoad
    window.addEventListener("load", handleLoad);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const {
    register,
    control,
    handleSubmit,
    reset,
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
    const { data, error } = await updateUserProfile(user.id, {
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

    if (error) return toast.error(t("messages:errors.editing_info"));
    toast.success(t("messages:success.success"));
    reset({ name, surname, gender, phone, town, nationality, description, birth_date, languages });
  };

  /* Country */
  const options = useMemo(() => countryList().getData(), []);

  /* Avatar */
  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const files = event.target.files;

    if (!files || files.length === 0) {
      // No files selected
      return;
    }

    const file = files[0];

    if (!file || !file.name) {
      // Invalid or missing file object
      return;
    }

    const { data, error } = await addAvatar(profile.id, file.name, file);
    console.log(error, "data");
    if (!error) {
      setProfile({ ...profile, avatar_url: data });
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
          <div className="text-center text-2xl font-bold lg:text-left lg:text-3xl">{t("admin:config.general")}</div>
          {profile && !profile.name && !profile.surname && !profile.birth_date && !profile.town && (
            <div className="text-red-500 flex">{t("common:warning")}</div>
          )}
          <div className="mb-5 mt-5">
            <div className="flex items-center justify-center lg:justify-start" id="profile">
              <label
                htmlFor="files"
                className="relative cursor-pointer rounded-full border border-primary-500 bg-white text-indigo-500"
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
              {t("admin:config.change_photo")}
            </h6>
          </div>

          {/* LEFT SIDE */}
          <div className="flex flex-col justify-between gap-12 lg:flex-row">
            <div className="w-full lg:w-1/2">
              <div className="mb-10">
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FeathersInput
                      value={value}
                      required={true}
                      onChange={onChange}
                      name="nome"
                      labelText={t("admin:config.name")}
                    />
                  )}
                  name="name"
                ></Controller>
              </div>
              <div className="mb-1">{t("admin:config.birth_date")}</div>
              <div className="birth-picker flex flex-row gap-4">
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FeatherDatePicker
                      date={value}
                      onChange={onChange}
                      className="w-full rounded-md border !border-solid border-solid border-terciary-500"
                    />
                  )}
                  name="birth_date"
                ></Controller>
              </div>

              <div className="my-10" id="nationality-drop">
                <label className="mt-2 block">{t("admin:config.nationality")} {<span>*</span>}</label>
                <Controller
                  control={control}
                  name="nationality"
                  render={({ field: { onChange, value } }) => (
                    <Select value={value} onChange={onChange} required>
                      <option value="">{t("admin:config.select_nationality")}</option>
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
                    <FeathersInput
                      value={value}
                      onChange={onChange}
                      required={true}
                      name="Apelido"
                      labelText={t("admin:config.surname")}
                    />
                  )}
                  name="surname"
                />
              </div>

              <div className="my-10">
                <div className="mb-1">{t("admin:config.gender")}</div>
                <div className="flex flex-row gap-4">
                  <div className="flex-1">
                    <select
                      {...register("gender")}
                      className="w-full rounded-md border border-solid border-terciary-500 bg-white px-3 py-2 focus:border-primary-500 focus:ring-0"
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
                  <FeathersInput
                    onChange={onChange}
                    value={value}
                    required={true}
                    name="localidade"
                    labelText={t("admin:config.location")}
                  />
                )}
                name="town"
              ></Controller>
            </div>
          </div>

          <div className="mb-1">{t("admin:config.about_me")}</div>
          <textarea
            {...register("description")}
            rows={5}
            className="mb-6 mt-1 block w-full rounded-md border border-solid border-terciary-500 bg-white px-2 py-3  shadow-sm focus:border-primary-500 focus:outline-none focus:ring-0"
            placeholder="Escreva aqui..."
          />

          {/* LÍNGUAS FALADAS */}
          <div className="mb-1">{t("admin:config.spoken_languages")}</div>
          <div className="flex flex-row">
            <Controller
              control={control}
              name="languages"
              render={({ field: { onChange, value } }) => {
                const options = [...getSpokenLanguages()];

                return (
                  <Select2
                    placeholder={t("admin:config.add_language")}
                    value={options.filter((option) => value.includes(option.value))}
                    onChange={(val) => onChange(val.map((c) => c.value))}
                    isMulti
                    options={options}
                    className="bg-white-100 mr-3 flex w-full items-center rounded-xl border border-gray-200 px-3 py-2 focus:border-primary-500"
                    styles={customStyles}
                    id="lang-drop"
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
            <div className="mb-1">{t("admin:config.phone_contact")}</div>
            <div>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="flex gap-3" id="phone-input">
                    <PhoneCountrySelect country={country} setCountry={setCountry} />
                    <Input
                      country={(country as CountryCode) || "PT"}
                      placeholder="XXX XXX XXX"
                      value={value}
                      onChange={(value) => onChange(value as string)}
                    />
                  </div>
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
                >
                  {t("save")}
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
  const locale = ctx.locale;
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: `auth/login`,
        permanent: false,
        locale: locale,
      },
    };

  const user = session.user;
  const { data: profile, error } = await supabase
    .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
    .select("*")
    .eq(PROFILE_COLUMNS.ID, user.id)
    .single();

  return {
    props: {
      initialSession: session,
      user: user,
      profileData: profile,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
