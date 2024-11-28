import { NodeOAuthClient } from "@atproto/oauth-client-node";
import { SessionStore, StateStore } from "./storage";
import { JoseKey } from "@atproto/jwk-jose";

export const createClient = async () => {
  const publicUrl = process.env.PUBLIC_URL;
  const url = publicUrl || `http://127.0.0.1:5173`;
  const enc = encodeURIComponent;

  const privateKeyPKCS8 = Buffer.from(
    process.env.PRIVATE_KEY_ES256_B64!,
    "base64"
  ).toString();
  const privateKey = await JoseKey.fromImportable(privateKeyPKCS8, "key1");

  return new NodeOAuthClient({
    clientMetadata: {
      client_name: "AniBlue",
      client_id: publicUrl
        ? `${url}/client-metadata.json`
        : `http://localhost?redirect_uri=${enc(
            `${url}/oauth/callback`
          )}&scope=${enc("atproto transition:generic")}`,
      client_uri: url,
      jwks_uri: `${url}/jwks.json`,
      redirect_uris: [`${url}/oauth/callback`],
      scope: "atproto transition:generic",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      application_type: "web",
      token_endpoint_auth_method: "private_key_jwt",
      token_endpoint_auth_signing_alg: "ES256",
      dpop_bound_access_tokens: true,
    },

    keyset: [privateKey],
    stateStore: new StateStore(),
    sessionStore: new SessionStore(),
  });
};
