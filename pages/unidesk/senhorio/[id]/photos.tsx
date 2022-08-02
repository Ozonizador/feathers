import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import PricesComponent from "../../../../components/anuncio/PricesComponent";
import MenuSenhorio from "../../../../components/unidesk/Menus/MenuSenhorio";
import Advertisement from "../../../../models/advertisement";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { getSingleAdvertisement, updateAdvertisement } from "../../../../services/advertisementService";

interface PhotosProps {
  id: string;
}

const Photos = ({ id }) => {
  const [advertisement, setAdvertisement] = useState<Advertisement>();

  const getAdvertisementInfo = useCallback(async () => {
    const { data, error } = await getSingleAdvertisement(id);
    if (!error) {
      setAdvertisement(data);
    }
  }, [id]);

  useEffect(() => {
    getAdvertisementInfo();
  }, [getAdvertisementInfo]);

  const saveChanges = async () => {
    const { data, error } = await updateAdvertisement(advertisement, id);
    if (!error) {
    }
  };

  const changeAdvertisementProperty = (property, value) => {
    setAdvertisement({ ...advertisement, [property]: value });
  };

  return (
    <div className="container mx-auto my-20 w-11/12 rounded-2xl border border-terciary-700 bg-terciary-300  pl-0 lg:container lg:my-20 lg:w-full  lg:px-0 ">
      <div className="flex flex-col lg:flex-row">
        <div className="p-5 lg:border-r lg:p-12">
          <MenuSenhorio id={id} />
        </div>

        {/* FOTOS */}
        <div className="mx-auto w-4/5  pt-12 text-center lg:ml-12 lg:text-left">
          <div className="mb-7 text-2xl font-semibold">Fotografias</div>

          <div className="mx-auto flex w-64 flex-col  gap-6 lg:w-full lg:flex-row lg:items-center">
            <div className="relative h-64 w-64 rounded-lg bg-black bg-[url('/images//rectangle_3400.jpg')] bg-cover bg-no-repeat lg:h-32 lg:w-32">
              <div className="absolute top-2 left-2 rounded-full bg-primary-500 px-3 py-1 text-xs text-white">Capa</div>
            </div>

            <div className=" h-64 w-64 rounded-lg bg-black bg-[url('/images//rectangle_3401.jpg')] bg-cover bg-no-repeat lg:h-32 lg:w-32"></div>

            {/* BOTÃO */}
            <label htmlFor="files" className="relative cursor-pointer">
              {" "}
              <div className=" flex flex-col items-center justify-center align-middle">
                {" "}
                <div>
                  {" "}
                  <span className="text-5xl text-primary-300">
                    <AiOutlinePlusCircle />{" "}
                  </span>{" "}
                </div>
                <div className="text-gray-500">carregar mais fotos</div>{" "}
              </div>{" "}
            </label>

            <input
              type="file"
              id="files"
              // onChange={uploadToClient}
              multiple
              accept="image/png, image/gif, image/jpeg"
              className="hidden"
            />
          </div>
          <button
            className="my-10 flex w-full items-center justify-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-28"
            onClick={saveChanges}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>

    // <div className="container mx-auto my-20 rounded-2xl border border-terciary-200 bg-terciary-300 py-12">
    //   <div className="flex px-12">
    //     <div className="w-1/5">
    //       <MenuSenhorio id={id} />
    //     </div>
    //     <div className="ml-20 w-4/5">
    //       <div className="mb-7 text-2xl font-semibold">Fotografias</div>

    //       <div className="flex flex-row items-center gap-6">
    //         <div className="relative h-32 w-32 rounded-lg bg-black bg-[url('/images//rectangle_3400.jpg')] bg-cover bg-no-repeat">
    //           <div className="absolute top-2 left-2 rounded-full bg-primary-500 px-3 py-1 text-xs text-white">
    //             Capa
    //           </div>
    //         </div>

    //         <div className=" h-32 w-32 rounded-lg bg-black bg-[url('/images//rectangle_3401.jpg')] bg-cover bg-no-repeat"></div>

    //         <label htmlFor="files" className="relative cursor-pointer ">
    //           <div className=" flex flex-col items-center justify-center align-middle">
    //             <div>
    //               <span className="text-5xl text-primary-300">
    //                 <AiOutlinePlusCircle />
    //               </span>
    //             </div>

    //             <div className="text-gray-500">carregar mais fotos</div>
    //           </div>
    //         </label>
    //         <input
    //           type="file"
    //           id="files"
    //           // onChange={uploadToClient}
    //           multiple
    //           accept="image/png, image/gif, image/jpeg"
    //           className="hidden"
    //         />
    //       </div>

    //       <div>
    //         <button
    //           className="hover: mt-14  flex w-28 items-center justify-center rounded-md bg-primary-500 py-3  text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl"
    //           onClick={saveChanges}
    //         >
    //           Guardar
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Photos;

export const getServerSideProps = withPageAuth({
  redirectTo: "/auth/login",
  getServerSideProps: async (context) => {
    const id = context.query.id;

    return {
      props: { id },
    };
  },
});
