import { Agent } from "@atproto/api";
import { getSession } from "~/sessions";
import { createClient } from "./client";

export async function getSessionAgent(req: Request): Promise<Agent | null> {
  const session = await getSession(req.headers.get("Cookie"));
  const client = await createClient();

  if (!session.data.did) return null;

  try {
    const oauthSession = await client.restore(session.data.did);
    return oauthSession ? new Agent(oauthSession) : null;
  } catch (err) {
    console.warn({ err }, "oauth restore failed");
    return null;
  }
}
