import { createClient } from "~/lib/auth/client";
import { json } from "@vercel/remix";

export async function loader() {
  const client = await createClient();

  return json(client.clientMetadata);
}
