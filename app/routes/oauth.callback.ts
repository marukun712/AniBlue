import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { createClient } from "~/lib/auth/client";
import { commitSession, getSession } from "~/sessions";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const client = await createClient();

  try {
    const { session: oauthSession } = await client.callback(params);
    const session = await getSession(request.headers.get("Cookie"));

    session.set("did", oauthSession.did);

    return redirect("/", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  } catch (e) {
    console.error(e);

    return redirect("/login");
  }
}
