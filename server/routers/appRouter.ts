import { router } from "../trpc";
import { advertisementsRouter } from "./advertisementsRouter";

const appRouter = router({
  advertisements: advertisementsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
