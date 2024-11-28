import { NodeOAuthClient } from "@atproto/oauth-client-node";
import { SessionStore, StateStore } from "./storage";
import { isProduction } from "~/utils/isProduction";

const createClient: () => Promise<NodeOAuthClient> = async () => {
  const publicUrl = isProduction
    ? "https://aniblue.vercel.app/"
    : "http://127.0.0.1:5173";
  const url = publicUrl || "http://127.0.0.1:5173";
  const enc = encodeURIComponent;

  return new NodeOAuthClient({
    clientMetadata: {
      client_name: "aniblue",
      client_id: publicUrl
        ? `${url}/client-metadata.json`
        : `http://localhost?redirect_uri=${enc(
            `${url}/oauth/callback`
          )}&scope=${enc("atproto transition:generic")}`,
      client_uri: url,
      redirect_uris: [`${url}/oauth/callback`],
      scope: "atproto transition:generic",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      application_type: "web",
      token_endpoint_auth_method: "none",
      dpop_bound_access_tokens: true,
    },
    stateStore: new StateStore(),
    sessionStore: new SessionStore(),
  });
};

export const client: NodeOAuthClient = await createClient();
