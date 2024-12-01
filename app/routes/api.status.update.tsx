import { ActionFunction } from "@remix-run/node";
import {
  isRecord,
  validateRecord,
} from "~/generated/api/types/app/netlify/aniblue/status";
import { StatusAgent } from "~/lib/agent/statusAgent";
import { getSessionAgent } from "~/lib/auth/session";

export const action: ActionFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);
  if (agent == null) return null;

  const record = await request.json();

  const statusAgent = new StatusAgent(agent);

  //バリデーション
  if (isRecord(record) && validateRecord(record)) {
    await statusAgent.put(record, agent.assertDid);

    return { ok: true };
  }

  return { ok: false };
};
