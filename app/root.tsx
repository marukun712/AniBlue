import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import stylesheet from "~/tailwind.css?url";
import fontstyle from "~/font.css?url";

import { RecoilRoot } from "recoil";
import NotFound from "./components/ui/404";
import ErrorPage from "./components/ui/errorPage";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: fontstyle },
];

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
