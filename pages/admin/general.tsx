import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Session, User, useUser } from "@supabase/auth-helpers-react";
import classNames from "classnames";
import { Spinner, Avatar, Select, Toast } from "flowbite-react";
import { GetServerSidePropsContext } from "next";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import Breadcrumbs, { BreadcrumbPath } from "../../components/utils/Breadcrumbs";
import FeatherDatePicker from "../../components/utils/FeatherDatepicker";
import Input from "../../components/utils/Input";
import { Profile, Gender, LanguageLabel } from "../../models/profile";
import useProfileService from "../../services/useProfileService";
import { dateToFormat } from "../../utils/utils";

import "react-phone-number-input/style.css";
import { ADMIN_URL } from "../../models/paths";

const paths = [
  { url: ADMIN_URL, label: "Conta" },
  { url: "", label: "Informações pessoais" },
] as BreadcrumbPath[];

interface ProfileEdition {
  name: string;
  surname: string;
  gender: number;
  phone: string;
  town: string;
  nationality: string;
  description: string;
  birth_date: Date;
}

interface IndexProps {
  initialSession: Session;
  user: User;
  profileData: Profile;
}

const Index = ({ user, profileData }: IndexProps) => {
  const { addAvatar, getUserProfile, updateUserProfile } = useProfileService();
  const [profile, setProfile] = useState<Profile>(profileData);
  const [loading, setLoading] = useState<boolean>(false);

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
    });

    if (!error) {
      toast.success("OK");
    }
  };

  const getProfile = useCallback(async () => {
    if (user) {
      const { data, error } = await getUserProfile(user.id);
      if (!error && data) {
        setProfile(data);
      }
    }
    setLoading(false);
  }, [user]);

  /* Country */
  const options = useMemo(() => countryList().getData(), []);

  /* Avatar */
  const uploadAvatar = async (event) => {
    event.preventDefault();

    if (event.target.files) {
      let file = event.target.files[0] as File;
      const { data, error } = await addAvatar(profile.id, file.name, file);
      if (!error) {
        setProfile({ ...profile, avatar_url: data });
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    getProfile();
  }, [getProfile]);

  return (
    <div className="mx-auto mb-20 w-full sm:container lg:w-10/12">
      <Breadcrumbs paths={paths} />
      <div className="flex flex-1 justify-center">
        {loading && (
          <>
            <Spinner color="info" aria-label="loading" size="lg" />
          </>
        )}
        {!loading && (
          <>
            <form
              className="w-full rounded-2xl border border-terciary-700 bg-terciary-300 p-10 lg:px-32"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="text-center text-2xl font-bold lg:text-left lg:text-3xl">Informações pessoais</div>
              <div className="mt-5 mb-5 ">
                <div className="flex items-center justify-center lg:justify-start">
                  <label htmlFor="files" className="relative cursor-pointer rounded-md text-indigo-500 ">
                    <Avatar
                      img={
                        profile?.avatar_url
                          ? profile.avatar_url
                          : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      }
                      rounded={true}
                      status="away"
                      size="lg"
                      statusPosition="bottom-right"
                    />
                  </label>
                  <input
                    type="file"
                    id="files"
                    onChange={(e) => uploadAvatar(e)}
                    multiple
                    accept="image/png, image/gif, image/jpeg"
                    className="hidden"
                  />
                </div>
              </div>

              {/* LEFT SIDE */}
              <div className="flex flex-col justify-between gap-12 lg:flex-row">
                <div className="w-full lg:w-1/2">
                  <div className="mb-10">
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Input value={value} onChange={onChange} label="nome" labelText="Nome" />
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
                <div className=" -mt-12 w-full lg:mt-0 lg:w-1/2 ">
                  <div className="mb-10">
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Input value={value} onChange={onChange} label="Apelido" labelText="Apelido" />
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
                          className="w-full rounded-md border border-solid border-terciary-500 bg-white py-2 px-3"
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
                      <Input onChange={onChange} value={value} label="localidade" labelText="Localidade" />
                    )}
                    name="town"
                  ></Controller>
                </div>
              </div>

              <div className="mb-1">Sobre mim</div>
              <textarea
                {...register("description")}
                rows={5}
                className="mt-1 mb-6 block w-full rounded-md border border-solid border-terciary-500 bg-white py-3 px-2  shadow-sm"
                placeholder="Escreva aqui..."
              />

              {/* LÍNGUAS FALADAS */}
              <div className="mb-1">Línguas faladas</div>
              <div className="flex flex-row">
                <div className="mr-3 flex items-center rounded-xl bg-socials-gmail py-2 px-3  text-primary-500">
                  + Adicionar línguas
                </div>
                <div className="mr-5 flex flex-col gap-2 overflow-y-auto">
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
                </div>
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
                        onChange={onChange}
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
                        "mt-10 flex w-full items-center justify-center rounded-md bg-primary-500 py-4 px-9 text-center uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-44",
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
          </>
        )}
      </div>
    </div>
  );
};

export default Index;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
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
  const { data, error } = await getUserProfile(user.id);

  return {
    props: {
      initialSession: session,
      user: user,
    },
  };
};
