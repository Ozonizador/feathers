import { router } from "../trpc";
import { advertisementsRouter } from "./advertisementsRouter";
import { paymentsRouter } from "./paymentsRouter";
import { profilesRouter } from "./profilesRouter";

export const appRouter = router({
  advertisements: advertisementsRouter,
  profile: profilesRouter,
  payments: paymentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
