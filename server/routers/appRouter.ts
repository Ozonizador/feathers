import { router } from "../trpc";
import { advertisementsRouter } from "./advertisementsRouter";
import { faqsRouter } from "./faqsRouter";
import { paymentsRouter } from "./paymentsRouter";
import { profilesRouter } from "./profilesRouter";
import { reservationsRouter } from "./reservationsRouter";

export const appRouter = router({
  advertisements: advertisementsRouter,
  profile: profilesRouter,
  payments: paymentsRouter,
  reservations: reservationsRouter,
  faqs: faqsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
