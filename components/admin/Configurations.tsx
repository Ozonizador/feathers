import { TextInput } from "flowbite-react/lib/esm/components";
import { Label } from "flowbite-react/lib/esm/components";
import useUserService from "../../hooks/userService";
import { useState } from "react";
import { toast } from "react-toastify";
import FeathersButton from "../utils/Button";
import { useUser } from "@supabase/auth-helpers-react";
import useProfileService from "../../hooks/useProfileService";
import Breadcrumbs, { BreadcrumbPath } from "../utils/Breadcrumbs";
import { ADMIN_URL } from "../../models/paths";
import Checkbox from "../utils/Checkbox";
// PÁGINA 36

const paths = [{ url: ADMIN_URL, label: "Conta" }] as BreadcrumbPath[];

const Configurations = () => {
  const user = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { updateUserPassword } = useUserService();
  const { updateNotificationEmail, updateNotificationMessage } = useProfileService();

  const updatePassword = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) throw Error("Palavras passe não coincidem.");

      const { error } = await updateUserPassword(password);
      if (error) throw Error(error.message);

      toast.success("Password alterada");
    } catch (e: any) {
      toast.error(e.message as string);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserNotificationEmail = async () => {
    if (user) {
      // modify this
      const { data, error } = await updateNotificationEmail(user.id, false);
    }
  };

  const toggleUserNotificationMessage = async () => {
    if (user) {
      // modify this
      const { data, error } = await updateNotificationMessage(user.id, false);
    }
  };

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
                            <Checkbox checked={true} onChange={toggleUserNotificationEmail} name="notification_email" />
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
                              checked={true}
                              onChange={toggleUserNotificationMessage}
                              name="notification_message"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
