import React from "react";
import DescricaoCondicoes from "../../components/destaques/RoomInformation/DescricaoCondicoes/DescricaoCondicoes";
import SingleRoomGrid from "../../components/destaques/RoomInformation/SingleRoomGrid/SingleRoomGrid";
import RoomInformation from "../../components/destaques/RoomInformation/RoomInformation";
import RoomMap from "../../components/destaques/RoomInformation/RoomMap/RoomMap";
import RoomPagamento from "../../components/destaques/RoomInformation/RoomPagamento/RoomPagamento";
import RoomRating from "../../components/destaques/RoomInformation/RoomRating/RoomRating";
import RoomSenhorio from "../../components/destaques/RoomInformation/RoomSenhorio/RoomSenhorio";
import RoomSemelhantes from "../../components/destaques/RoomInformation/RoomsSemelhantes/RoomsSemelhantes";
import RoomSlider from "../../components/destaques/RoomInformation/Slider/RoomSlider";
import ModalDetalhesPagamento from "../../components/modals/ModalDetalhesPagamentos";
import { ShowingSingleAdvertisementProvider } from "../../context/ShowingSingleAdvertisementProvider";
import {
  AdvertisementComplete,
  Advertisements,
  ADVERTISEMENT_PROPERTIES,
  ADVERTISEMENT_TABLE_NAME,
} from "../../models/advertisement";
import { ModalAnuncioInfoProvider } from "../../context/ModalShowProvider";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import AdvertConditions from "../../components/destaques/RoomInformation/AdvertConditions/AdvertConditions";
import ModalReviewsAdvert from "../../components/modals/ModalReviewsAdvert";
import { Conversations, CONVERSATION_PROPERTIES, CONVERSATION_TABLE_NAME } from "../../models/conversation";

interface AnuncioProps {
  advertisement: AdvertisementComplete;
  responseRate: number;
}

const Anuncio = ({ advertisement, responseRate }: AnuncioProps) => {
  return (
    <ShowingSingleAdvertisementProvider advertisement={advertisement}>
      <ModalAnuncioInfoProvider>
        <>
          <ModalReviewsAdvert />
          <ModalDetalhesPagamento />
          <div className="container mx-auto px-2 md:px-20">
            <SingleRoomGrid />
            <div className="flex flex-col lg:flex-row">
              <div className="w-full px-5 lg:w-4/6">
                <RoomInformation />
                <div className="mt-10 flex flex-col gap-4 lg:flex-row">
                  <DescricaoCondicoes />
                  <AdvertConditions />
                </div>

                <RoomSlider />
                <RoomRating />
                <RoomMap />
                <RoomSenhorio responseRate={responseRate} />
                <RoomSemelhantes />
              </div>

              <div className="mb-20 w-full lg:mb-0 lg:w-2/6 lg:px-5">
                <RoomPagamento />
              </div>
            </div>
          </div>
        </>
      </ModalAnuncioInfoProvider>
    </ShowingSingleAdvertisementProvider>
  );
};

export default Anuncio;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const slug = ctx.params?.slug;
  /* Not Found */
  if (!slug) {
    return {
      notFound: true,
    };
  }
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const { data: advertisement, error } = await supabase
    .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
    .select(`*, host:host_id(*), stays(tenant:tenant_id(name, surname, avatar_url), reviews(*))`)
    .eq(ADVERTISEMENT_PROPERTIES.SLUG, slug)
    .limit(1)
    .single();

  if (error) {
    console.log(`[Supabase]: Failed to fetch the advertisement: ${slug}`, error.message);
  }

  if (advertisement) {
    const { count: allConversations, error: allConversationsError } = await supabase
      .from<"conversations", Conversations>(CONVERSATION_TABLE_NAME)
      .select()
      .eq(CONVERSATION_PROPERTIES.HOST_ID, advertisement.host);

    const { count: repliedConversation, error: repliedConversationError } = await supabase
      .from<"conversations", Conversations>(CONVERSATION_TABLE_NAME)
      .select("id, messages!inner(id)")
      .eq(CONVERSATION_PROPERTIES.HOST_ID, advertisement.host);

    const responseRate =
      (allConversationsError && repliedConversationError) || !allConversations
        ? 0
        : repliedConversation || 0 / allConversations;

    return {
      props: { advertisement, initialSession: session, user: session.user, responseRate },
    };
  } else {
    return {
      notFound: true,
    };
  }
};
