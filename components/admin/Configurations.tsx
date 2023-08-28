import useUserService from "../../hooks/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FeathersButton from "../utils/Button";
import Breadcrumbs, { BreadcrumbPath } from "../utils/Breadcrumbs";
import { ADMIN_URL } from "../../models/paths";
import Checkbox from "../utils/Checkbox";
import { Label, TextInput } from "flowbite-react";
import { trpc } from "../../utils/trpc";
import Button from "../utils/Button";
import { Profile, UserTypes } from "../../models/profile";
import RadioBox from "../utils/Radiobox";
// PÁGINA 36

const paths = [{ url: ADMIN_URL, label: "Conta" }] as BreadcrumbPath[];

const Configurations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [profileConfigs, setProfileConfigs] = useState<
    Pick<Profile, "accepts_notification_email" | "accepts_notification_message" | "prefered_unidesk_state">
  >({
    accepts_notification_email: false,
    accepts_notification_message: false,
    prefered_unidesk_state: "TENANT",
  });
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { updateUserPassword } = useUserService();

  const { data, refetch } = trpc.profile.getProfileConfigurations.useQuery();
  const updateProfileConfigurations = trpc.profile.updateProfileConfigurations.useMutation();

  const updatePassword = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) throw Error("Palavras passe não coincidem.");
      if (currentPassword === password) throw Error("Nova palavra passe e palavra passe atual são as mesmas");

      const { error } = await updateUserPassword(password);
      if (error) throw Error(error.message);

      toast.success("Password alterada");
    } catch (e: any) {
      toast.error(e.message as string);
    } finally {
      setLoading(false);
    }
  };

  const updateConfigurations = async () => {
    await updateProfileConfigurations.mutateAsync(
      { ...profileConfigs },
      {
        onSuccess: () => {
          toast.success("Editado com successo");
        },
      }
    );
  };

  useEffect(() => {
    data && setProfileConfigs({ ...data });
  }, [data]);
  return (
    <>
      <div className="container mx-auto mb-20 lg:w-10/12 ">
        <Breadcrumbs paths={paths} />

        <div className="flex flex-1 justify-center">
          <div className="w-full rounded-2xl border border-terciary-700 bg-terciary-300 p-10 px-0 lg:px-32">
            <div className="mx-auto w-full px-5 lg:w-1/2">
              <div className="text-3xl font-bold">Configurações</div>
              {/* password */}
              <div>
                <div className="mb-8  mt-4 text-2xl font-bold">Alterar password</div>
                <div className="mb-2 block">
                  <div className="my-3">
                    <Label htmlFor="Palavra passe atual" value="Palavra passe atual" />
                    <TextInput
                      id="passwordNew"
                      type="password"
                      required={true}
                      shadow={true}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>

                  <div className="my-3">
                    <Label htmlFor="Palavra passe nova" value="Palavra passe nova" />
                    <TextInput
                      id="passwordNew"
                      type="password"
                      required={true}
                      shadow={true}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Label htmlFor="Repita palavra passe nova" value="Repita palavra passe nova" />
                  <TextInput
                    id="passwordRepeat"
                    type="password"
                    required={true}
                    shadow={true}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-1">
                  <div className="my-10 flex w-full items-center justify-center rounded-md bg-primary-500 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-56">
                    <FeathersButton loading={loading} onClick={updatePassword} type={"button"}>
                      Alterar password
                    </FeathersButton>
                  </div>
                </div>
              </div>

              {/* Notificações */}
              <div className="mt-10">
                <div className="my-4 text-2xl font-bold">Notificações</div>
                <h6>Receber notificações de Unihosts</h6>
                <div className="my-3 flex flex-1 flex-col">
                  <div className="my-2 flex flex-col lg:flex-row lg:items-center">
                    <div className="flex items-center">
                      <p className="w-32 text-base font-bold">Por email</p>
                      <div className="flex flex-row items-center justify-between rounded-lg border border-terciary-500 px-3 py-3 lg:my-0 lg:ml-6">
                        <div>
                          <div className="flex h-5 items-center">
                            <Checkbox
                              checked={profileConfigs.accepts_notification_email || false}
                              onChange={() =>
                                setProfileConfigs({
                                  ...profileConfigs,
                                  accepts_notification_email: !profileConfigs.accepts_notification_email,
                                })
                              }
                              name="notification_email"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="my-2 flex flex-col lg:flex-row lg:items-center">
                    <div className="flex items-center">
                      <p className="w-32 text-base font-bold">Por mensagem</p>
                      <div className="flex flex-row items-center justify-between rounded-lg border border-terciary-500 px-3 py-3 lg:my-0 lg:ml-6">
                        <div>
                          <div className="flex h-5 items-center">
                            <Checkbox
                              checked={profileConfigs.accepts_notification_message || false}
                              onChange={() =>
                                setProfileConfigs({
                                  ...profileConfigs,
                                  accepts_notification_message: !profileConfigs.accepts_notification_message,
                                })
                              }
                              name="notification_message"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="my-2 flex flex-col lg:flex-row lg:items-center">
                    <div className="flex items-center">
                      <p className="w-32 text-base font-bold">Preferência Unidesk</p>
                      <div className="flex gap-3">
                        <div className="flex gap-2">
                          <label className="my-auto">Estudante</label>
                          <div className="my-auto">
                            <RadioBox
                              name="prefered_unidesk_state"
                              onChange={() =>
                                setProfileConfigs({
                                  ...profileConfigs,
                                  prefered_unidesk_state: "TENANT",
                                })
                              }
                              value={"TENANT" as UserTypes}
                              checked={profileConfigs.prefered_unidesk_state == ("TENANT" as UserTypes)}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <label className="my-auto">Senhorio</label>
                          <div className="my-auto">
                            <RadioBox
                              name="prefered_unidesk_state"
                              onChange={() =>
                                setProfileConfigs({
                                  ...profileConfigs,
                                  prefered_unidesk_state: "LANDLORD",
                                })
                              }
                              value={"LANDLORD" as UserTypes}
                              checked={profileConfigs.prefered_unidesk_state == ("LANDLORD" as UserTypes)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Button type={"button"} onClick={() => updateConfigurations()}>
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Configurations;
