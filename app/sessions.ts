import { createCookieSessionStorage } from "@vercel/remix";

type SessionData = {
  did: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "session",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      secrets: [process.env.SESSION_SECRET!],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
