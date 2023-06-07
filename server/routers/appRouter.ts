import { router } from "../trpc";
import { advertisementsRouter } from "./advertisementsRouter";
import { profilesRouter } from "./profilesRouter";

export const appRouter = router({
  advertisements: advertisementsRouter,
  profile: profilesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
