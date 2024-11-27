import { Agent } from "@atproto/api";
import { ActionFunction, json } from "@remix-run/node";
import {
  isRecord,
  validateRecord,
} from "~/generated/api/types/app/vercel/aniblue/status";
import { getSessionAgent } from "~/lib/auth/session";

export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return json(null);

  const record = await request.json();

  if (isRecord(record) && validateRecord(record)) {
    await agent.com.atproto.repo.putRecord({
      collection: "app.vercel.aniblue.status",
      repo: agent.assertDid,
      rkey: "self",
      record,
    });

    return json({ ok: true });
  }

  return null;
};
