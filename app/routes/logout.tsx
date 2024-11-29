import { getIronSession } from "iron-session";
import { redirect } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { Session } from "~/lib/auth/session";

export const loader: LoaderFunction = async ({ request }) => {
  const response = new Response();

  //セッションを削除
  const session = await getIronSession<Session>(request, response, {
    cookieName: "session",
    password: process.env.SESSION_SECRET!,
  });
  await session.destroy();
  return redirect("/", { headers: response.headers });
};
