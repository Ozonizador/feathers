import * as trpcNext from "@trpc/server/adapters/next";
import { advertisementsRouter } from "../../../server/routers/advertisementsRouter";

// export API handler
// @see https://trpc.io/docs/server/adapters
export default trpcNext.createNextApiHandler({
  router: advertisementsRouter,
  createContext: () => ({}),
});
