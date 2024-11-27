import { getIronSession, IronSession } from "iron-session";
import { Agent } from "@atproto/api";
import { client } from "./client";

export type Session = { did: string };

export async function getSessionAgent(req: Request): Promise<Agent | null> {
  const response = new Response();

  const session: IronSession<Session> = await getIronSession<Session>(
    req,
    response,
    {
      cookieName: "session",
      password: process.env.SESSION_SECRET!,
    }
  );

  if (!session.did) return null;
  try {
    const oauthSession = await client.restore(session.did);
    return oauthSession ? new Agent(oauthSession) : null;
  } catch (err) {
    console.warn({ err }, "oauth restore failed");
    await session.destroy();
    return null;
  }
}
