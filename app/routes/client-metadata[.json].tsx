import { json } from "@vercel/remix";
import { createClient } from "~/lib/auth/client";

export async function loader() {
  const client = await createClient();

  return json(client.clientMetadata);
}
