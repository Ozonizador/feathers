import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Input from "../utils/Input";
import { Avatar, Select } from "flowbite-react";
import { Toast } from "flowbite-react";
import { Gender, LanguageLabel, Profile, PROFILE_COLUMNS } from "../../models/profile";
import { useUser } from "@supabase/auth-helpers-react";
import { getUserProfile, updateUserProfile } from "../../services/profileService";
import countryList from "react-select-country-list";
import FeatherDatePicker from "../utils/FeatherDatepicker";

/*
    pagina 32 do XD
*/

const MainMenu = () => {
  const [profile, setProfile] = useState<Profile>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useUser();

  const getProfile = useCallback(async () => {
    if (user) {
      const { data, error } = await getUserProfile(user.id);
      if (!error && data) {
        setProfile(data);
      }
    }
    setLoading(false);
  }, [user]);

  const saveUserProfile = async () => {
    const { data, error } = await updateUserProfile(user.id, profile);
    if (!error) {
      setProfile(data);
    }
  };

  const handleProfileInfoByProperty = (property: string, value: any) => {
    setProfile({ ...profile, [property]: value });
  };

  /* Country */
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    // setValue(value);
  };

  useEffect(() => {
    setLoading(true);
    getProfile();
  }, [getProfile]);

  return (
    <div className="mx-auto mb-20 w-10/12">
      <div className="font-b my-10 text-xl">
        <Link href="/admin">Conta</Link>
        {" > Informações pessoais"}
      </div>

      <div className="flex flex-1 justify-center">
        <div className="w-full rounded-2xl border border-terciary-700 bg-terciary-300 p-10 px-32">
          <div className="text-3xl font-bold">Informações pessoais</div>
          <div className="mt-5 mb-5">
            <Avatar
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded={true}
              status="away"
              size="lg"
              statusPosition="bottom-right"
            />
          </div>

          {/* LEFT SIDE */}
          <div className="flex flex-row justify-between gap-12">
            <div className="w-1/2">
              <div className="mb-10">
                <Input
                  value={profile?.name}
                  onChange={(e) => handleProfileInfoByProperty(PROFILE_COLUMNS.NAME, e.target.value)}
                  label="nome"
                  labelText="Nome"
                />
              </div>
              <div className="mb-1">Data de nascimento</div>
              <div className="flex flex-row gap-4">
                <FeatherDatePicker
                  date={profile?.birthDate || new Date()}
                  onChange={(date) => handleProfileInfoByProperty(PROFILE_COLUMNS.BIRTH_DATE, date)}
                />
              </div>

              <div className="my-10">
                <label className="mt-2 block">Nacionalidade</label>
                <Select
                  value={profile?.nationality || "portuguese"}
                  onChange={changeHandler}
                  // className="w-full rounded-md border  border-solid border-terciary-500 bg-white py-2 px-3"
                ></Select>
              </div>
              <div>
                <button onClick={saveUserProfile}>Salvar</button>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-1/2 ">
              <div className="mb-10">
                <Input
                  value={profile?.surname || ""}
                  onChange={(e) => handleProfileInfoByProperty(PROFILE_COLUMNS.SURNAME, e.target.value)}
                  label="Apelido"
                  labelText="Apelido"
                />
              </div>

              <div className="my-10">
                <div className="mb-1">Género</div>
                <div className="flex flex-row gap-4">
                  <div className="flex-1">
                    <select
                      className="w-full rounded-md border  border-solid border-terciary-500 bg-white py-2 px-3"
                      onChange={(e) => handleProfileInfoByProperty(PROFILE_COLUMNS.GENDER, e.target.value)}
                      value={profile?.gender}
                    >
                      <option value={Gender.female}>Feminino</option>
                      <option value={Gender.male}>Masculino</option>
                      <option value={Gender.other}>Outro</option>
                    </select>
                  </div>
                </div>
              </div>

              <Input
                onChange={(e) => handleProfileInfoByProperty(PROFILE_COLUMNS.TOWN, e.target.value)}
                value={profile?.town}
                label="localidade"
                labelText="Localidade"
              />
            </div>
          </div>

          <div className="mb-1">Sobre mim</div>
          <textarea
            rows={5}
            className="mt-1 mb-6 block w-full rounded-md border border-solid border-terciary-500 bg-white py-3 px-2  shadow-sm"
            placeholder="Escreva aqui..."
            value={profile?.description}
            onChange={(e) => handleProfileInfoByProperty(PROFILE_COLUMNS.DESCRIPTION, e.target.value)}
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
            <div className="flex w-full flex-row items-center  gap-4">
              <div className="w-36">
                <select className="w-full rounded-md border  border-solid border-terciary-500 bg-white px-3">
                  <option>PT +351</option>
                </select>
              </div>
              <div className="">
                <Input
                  value={profile?.phone}
                  onChange={(e) => handleProfileInfoByProperty(PROFILE_COLUMNS.PHONE, e.target.value)}
                  label="phone"
                  labelText=""
                />
              </div>
            </div>
          </div>

          <div className="my-8">
            <div>Validade</div>
            <div className="flex w-full flex-row items-center  gap-4">
              <div className="w-36">
                <select className="w-full rounded-md border  border-solid border-terciary-500 bg-white px-3">
                  <option>Dia</option>
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                  <option>04</option>
                  <option>05</option>
                  <option>06</option>
                  <option>07</option>
                  <option>08</option>
                  <option>09</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                  <option>15</option>
                  <option>16</option>
                  <option>17</option>
                  <option>18</option>
                  <option>19</option>
                  <option>20</option>
                  <option>21</option>
                  <option>22</option>
                  <option>23</option>
                  <option>24</option>
                  <option>25</option>
                  <option>26</option>
                  <option>27</option>
                  <option>28</option>
                  <option>29</option>
                  <option>30</option>
                  <option>31</option>
                </select>
              </div>

              <div className="w-36">
                <select className="w-full rounded-md border  border-solid border-terciary-500 bg-white px-3">
                  <option>Mês</option>
                  <option>Janeiro</option>
                  <option>Fevereiro</option>
                  <option>Março</option>
                  <option>Abril</option>
                  <option>Maio</option>
                  <option>Junho</option>
                  <option>Julho</option>
                  <option>Agosto</option>
                  <option>Setembro</option>
                  <option>Outubro</option>
                  <option>Novembro</option>
                  <option>Dezembro</option>
                </select>
              </div>

              <div className="w-36">
                <select className="w-full rounded-md border  border-solid border-terciary-500 bg-white px-3">
                  <option>Ano</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
