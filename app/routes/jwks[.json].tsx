import { createClient } from "~/lib/auth/client";

export async function loader() {
  const client = await createClient();

  return Response.json(client.jwks);
}
