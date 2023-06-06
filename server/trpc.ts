import { initTRPC } from "@trpc/server";
import { LoggedUserContext } from "./context";
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<LoggedUserContext>().create();
// Base router and procedure helpers
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
