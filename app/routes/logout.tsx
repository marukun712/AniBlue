import { redirect } from "@remix-run/react";
import { LoaderFunction } from "@vercel/remix";
import { destroySession, getSession } from "~/sessions";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};
