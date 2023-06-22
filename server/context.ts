import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import jwt from "jsonwebtoken";

export async function createContext({ req, res }: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  // This is just an example of something you might want to do in your ctx fn
  async function getUserFromHeader() {
    const userAuth = req.cookies["sb-localhost-auth-token"];

    if (!userAuth || !process.env.SUPABASE_JWT_SECRET) return undefined;

    const parsedAuth = JSON.parse(userAuth);
    const token = parsedAuth[0];
    try {
      var decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET) as jwt.JwtPayload;
      var userId = decoded.sub;
      return userId;
    } catch (err) {
      return undefined;
    }
  }

  const userId = await getUserFromHeader();
  return {
    userId,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
