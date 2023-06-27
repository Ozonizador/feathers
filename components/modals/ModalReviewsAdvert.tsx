import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useModaisAnuncioDetalhes, useSetModalReviews } from "../../context/ModalShowProvider";
import { useGetSingleAdvertisement } from "../../context/ShowingSingleAdvertisementProvider";
import ReviewCard from "../advertisements/ReviewCard";
import useReviewService from "../../hooks/reviewService";
import { AdvertisementReviewSummary } from "../../models/review";
import { RoomAveragesSection } from "../destaques/RoomInformation/RoomRating/RoomRating";
import { Rating } from "flowbite-react";

/* PAGINA 7 DO XD */
const ModalReviewsAdvert = () => {
  const [roomAverages, setRoomAverages] = useState<AdvertisementReviewSummary | undefined>(undefined);
  const advertisement = useGetSingleAdvertisement();
  const { stays } = advertisement || { stays: [] };
  let { reviewsModalOpen } = useModaisAnuncioDetalhes();
  let setModalReviewsOpen = useSetModalReviews();
  const { getAveragesByAdvertisementId } = useReviewService();

  // TODO: repeated call to be removed.
  const getRoomAverages = useCallback(async () => {
    if (!advertisement) return;
    const { data, error } = await getAveragesByAdvertisementId(advertisement.id);
    if (!error) {
      setRoomAverages(data as AdvertisementReviewSummary);
    }
  }, [advertisement]);

  useEffect(() => {
    getRoomAverages();
  }, [getRoomAverages]);

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
                  <div className="flex flex-col gap-7 px-2 py-3 lg:flex-row">
                    <div className="flex w-full flex-col gap-3 p-2 lg:w-1/2">
                      <div className="border-b border-neutral-100 pb-2 ">
                        <Rating size="lg">
                          <h6 className="mr-4 text-5xl text-primary-500">{roomAverages?.overall_average}</h6>
                          <Rating.Star filled={roomAverages && roomAverages.overall_average >= 1 ? true : false} />
                          <Rating.Star filled={roomAverages && roomAverages.overall_average >= 2 ? true : false} />
                          <Rating.Star filled={roomAverages && roomAverages.overall_average >= 3 ? true : false} />
                          <Rating.Star filled={roomAverages && roomAverages.overall_average >= 4 ? true : false} />
                          <Rating.Star filled={roomAverages && roomAverages.overall_average >= 5 ? true : false} />
                        </Rating>

                        <p className="my-3">{roomAverages?.review_number} comentários</p>
                      </div>
                      <div>
                        <RoomAveragesSection averageRatings={roomAverages} showTopSection={false} />
                      </div>
                    </div>

                    <div className="w-full overflow-y-auto lg:w-1/2">
                      {stays && stays.length > 0 && (
                        <>
                          <div className="flex h-96 flex-col gap-2 pr-4 lg:overflow-y-scroll">
                            {stays.slice(0, 3).map((stay) => {
                              const review = stay.reviews && stay.reviews[0];
                              return (
                                <>
                                  <ReviewCard review={review} tenant={stay.tenant} key={stay.id} />
                                </>
                              );
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
