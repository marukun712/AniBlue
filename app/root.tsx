import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { RecoilRoot } from "recoil";
import NotFound from "./components/ui/404";
import ErrorPage from "./components/ui/errorPage";
import { getSessionAgent } from "./lib/auth/session";
import { useSetProfile } from "./state/profile";

import stylesheet from "~/tailwind.css?url";
import fontstyle from "~/font.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: fontstyle },
];

export const meta: MetaFunction = () => {
  return [
    { title: "AniBlue | AT Protocolのアニメ視聴管理ツール" },
    {
      property: "og:title",
      content: "AniBlue",
    },
    {
      property: "og:description",
      content:
        "AniBlueは、アニメの視聴記録を行うことができるツールです。視聴記録は、すべてユーザーのPDSに保存されます。",
    },
    {
      name: "description",
      content:
        "AniBlueは、アニメの視聴記録を行うことができるツールです。視聴記録は、すべてユーザーのPDSに保存されます。",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);
  if (agent == null) return null;

  const profile = await agent.getProfile({ actor: agent.assertDid });

  return profile;
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <html lang="jp" className="dark">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </RecoilRoot>
  );
}

export default function App() {
  const profile = useLoaderData<typeof loader>();
  const setProfile = useSetProfile();

  if (profile) {
    setProfile(profile.data);
  }

  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html lang="jp">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {isRouteErrorResponse(error) ? (
          error.status === 404 ? (
            <NotFound />
          ) : (
            <ErrorPage />
          )
        ) : (
          <ErrorPage />
        )}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
