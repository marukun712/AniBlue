import { LoaderFunctionArgs, redirect } from "@vercel/remix";
import { getIronSession } from "iron-session";
import { createClient } from "~/lib/auth/client";
import { Session } from "~/lib/auth/session";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const response = new Response();
  const client = await createClient();

  try {
    const { session } = await client.callback(params);
    const clientSession = await getIronSession<Session>(request, response, {
      cookieName: "session",
      password: process.env.SESSION_SECRET!,
    });

    clientSession.did = session.did;
    await clientSession.save();

    return redirect("/home", { headers: response.headers });
  } catch (error) {
    console.error("Error during session handling:", error);
    return null;
  }
}
