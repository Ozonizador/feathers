import { router } from "../trpc";
import { advertisementsRouter } from "./advertisementsRouter";
import { hostPreferencesRouter } from "./hostPreferencesRouter";

const appRouter = router({
  advertisements: advertisementsRouter,
  hostPreferences: hostPreferencesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
