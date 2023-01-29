import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useModalDetalhesPagamento, useSetModalReviews } from "../../context/ModalShowProvider";
import { useGetSingleAdvertisement } from "../../context/ShowingSingleAdvertisementProvider";
import ReviewCard from "../advertisements/ReviewCard";
import Button from "../utils/Button";

/* PAGINA 7 DO XD */
const ModalReviewsAdvert = () => {
  const advertisement = useGetSingleAdvertisement();
  const { stays } = advertisement;
  let { reviewsModalOpen } = useModalDetalhesPagamento();
  let setModalReviewsOpen = useSetModalReviews();

  return (
    <>
      <Transition appear show={reviewsModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-900" onClose={() => setModalReviewsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-col py-3 px-2 lg:flex-row">
                    <div></div>
                    <div>
                      {stays && stays.length > 0 && (
                        <>
                          <div className="flex flex-col gap-2">
                            {stays.slice(0, 3).map((stay, index) => {
                              const review = stay.reviews && stay.reviews[0];
                              return <ReviewCard review={review} tenant={stay.tenant} key={index} />;
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalReviewsAdvert;
