import { client } from "~/lib/auth/client";

export async function loader() {
  return Response.json(client.clientMetadata);
}
