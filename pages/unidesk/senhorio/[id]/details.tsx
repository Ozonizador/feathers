import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import PricesComponent from "../../../../components/anuncio/PricesComponent";
import MenuSenhorio from "../../../../components/unidesk/Menus/MenuSenhorio";
import Advertisement from "../../../../models/advertisement";
import { getSingleAdvertisement } from "../../../../services/advertisementService";

interface DetailsProps {
  id: string;
}

const Details = ({ id }: DetailsProps) => {
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

  return (
    <div className="flex px-24">
      <div className="w-1/5">
        <MenuSenhorio />
      </div>
      <div className="w-4/5">
        {advertisement && <PricesComponent advertisement={advertisement} onChange={() => {}} />}
      </div>
    </div>
  );
};

export default Details;

export const getServerSideProps = withPageAuth({
  redirectTo: "/auth/login",
  getServerSideProps: async (context) => {
    const id = context.query.id;

    return {
      props: { id },
    };
  },
});
