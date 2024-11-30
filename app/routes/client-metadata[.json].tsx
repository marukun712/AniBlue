import { json } from "@remix-run/node";
import { createClient } from "~/lib/auth/client";

export async function loader() {
  const client = await createClient();

  return json(client.clientMetadata);
}
