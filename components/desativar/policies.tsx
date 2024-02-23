import { useTranslation } from "next-i18next";
import Button from "../utils/Button";
import Checkbox from "../utils/Checkbox";
import Input from "../utils/Input";
import { toast } from "react-toastify";
import { useState } from "react";
import { useCurrentReason, useIncrementStep, useDecrementStep } from "../../context/DesativarProvider";
import useUserService from "../../hooks/userService";
import { BiCheckCircle } from "react-icons/bi";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";

const DesativarContaPoliciesForm = (profile: any) => {
  const { t } = useTranslation();
  const incrementStep = useIncrementStep();
  const decrementStep = useDecrementStep();
  const currentReason = useCurrentReason();
  const { deleteUserAccount } = useUserService();

  const deactivateAccount = async () => {
    await deleteUserAccount(currentReason);
  };

  return (
    <section>
      <div className="text-md lg:text-md mt-4 text-center font-black lg:text-left">
        {t("account:contact")} info@unihosts.pt
      </div>
      <div className="mx-auto py-6">
        <section className="rounded-md p-4" id="exit-form">
          <div className="flex items-center">
            <BiCheckCircle size={30}></BiCheckCircle>
            <div className="pl-4 text-xl">{t("account:warning_1")}</div>
          </div>
          <div className="flex items-center">
            <BiCheckCircle size={30}></BiCheckCircle>
            <div className="pl-4 text-xl">{t("account:warning_2")}</div>
          </div>
          <section className="flex justify-between pr-20 pt-10">
            <div className="w-1/6">
              <Button
                onClick={() => {
                  decrementStep();
                }}
                type={"button"}
              >
                {t("account:previous")}
              </Button>
            </div>
            <div className="w-1/6">
              <Button
                onClick={(e) => {
                  trpc.profile.deleteProfilebyId.useQuery(profile);
                  toast.success(currentReason);
                  setTimeout(() => {
                    useRouter().push("/")
                  }, 10000);
                }}
                type={"button"}
              >
                {t("account:title")}
              </Button>
            </div>
          </section>
        </section>
      </div>
    </section>
  );
};

export default DesativarContaPoliciesForm;
