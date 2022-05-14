import type { MetaFunction, LoaderFunction } from "@remix-run/node";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/node";

import styles from "./tailwind.css";
import { getMainNav } from "./utils/nav.server";
import Nav from "./components/nav/Nav";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => [{ rel: "stylesheet", href: styles }];

type LoaderData = {
  mainNav: Awaited<ReturnType<typeof getMainNav>>;
};

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({
    mainNav: await getMainNav(),
  });
};

export default function App() {
  const data = useLoaderData() as LoaderData;

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Nav mainNav={data.mainNav} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
