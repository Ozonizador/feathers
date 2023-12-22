import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { TiPlus, TiMinus } from "react-icons/ti";
import Toggle from "../components/toggle/toggle";
import { useGetUserType } from "../context/MainProvider";
import { UserTypes } from "../models/profile";
import { trpc } from "../utils/trpc";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Faqs = () => {
  const { userAppMode } = useGetUserType();
  const [selectedFaq, setSelectedFaq] = useState<UserTypes>(userAppMode);
  const [ onLoad, setOnLoad ] = useState<boolean>(false)

  useEffect(() => {
    const queryString = window.location.search.slice(1);
    if ((queryString == "TENANT" || queryString == "LANDLORD") && !onLoad) {
      setSelectedFaq(queryString as UserTypes);
      setOnLoad(true);
    }
  });

  const { data } = trpc.faqs.getFaqs.useQuery(undefined, {
    retry: false,
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const tenantFaqs = data && data.data && data.data.filter((faq) => faq.type === "TENANT");
  const landlordFaqs = data && data.data && data.data.filter((faq) => faq.type === "LANDLORD");
  return (
    <>
      <section className="max-width px-4 lg:px-0">
        <div className=" mx-auto mb-5">
          <h1 className="mt-24 text-center text-6xl font-bold">FAQ</h1>
        </div>

        <div className="flex cursor-pointer justify-center">
          <Toggle
            selectedValue={selectedFaq}
            onChange={() => {setSelectedFaq(selectedFaq == "LANDLORD" ? "TENANT" : "LANDLORD");}}
          />
        </div>

        <div className="mb-32">
          {/* Estudante */}
          {selectedFaq === "TENANT" && (
            <>
              {tenantFaqs && tenantFaqs.length > 0 && (
                <div className="flex flex-col gap-4">
                  {tenantFaqs.map((faq) => (
                    <FaqQuestion key={faq.id} answer={faq.answer} question={faq.question} />
                  ))}
                </div>
              )}
            </>
          )}
          {/* SENHORIO */}
          {selectedFaq === "LANDLORD" && (
            <>
              {landlordFaqs && landlordFaqs.length > 0 && (
                <div className="flex flex-col gap-4">
                  {landlordFaqs.map((faq) => (
                    <FaqQuestion key={faq.id} answer={faq.answer} question={faq.question} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Faqs;

type FaqQuestionProps = {
  question: string;
  answer: string;
};

const FaqQuestion = ({ question, answer }: FaqQuestionProps) => {
  const [answerShown, setAnswerShown] = useState<boolean>(false);

  const toggleAnswerShown = () => {
    setAnswerShown(!answerShown);
  };

  const splitAnswer = answer.split(/\r?\n|\r|\n/g);
  return (
    <div className="flex flex-col gap-4 rounded-md border p-4">
      <div className="flex">
        <h6
          className={classNames("text-lg", {
            "font-normal": !answerShown,
            "font-bold subpixel-antialiased": answerShown,
          })}
        >
          {question}
        </h6>
        <div className="ml-auto mr-4" onClick={() => toggleAnswerShown()}>
          {!answerShown ? <TiPlus size={24} /> : <TiMinus size={24} />}
        </div>
      </div>
      {answerShown && (
        <div className="flex flex-col pr-5">
          {splitAnswer && splitAnswer.map((line, index) => {
            return <p className="text-justify" key={index}>{line}</p>
          })}
          <div className="ml-auto mr-4 pr-10"></div>
        </div>
      )}
    </div>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
}
