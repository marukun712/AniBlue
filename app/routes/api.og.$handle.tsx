import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import fs from "fs";

const fontData = fs.readFileSync("./public/fonts/NotoSansJP-Regular.ttf");

export async function generateOgImage(text: string, avatar: string) {
  const svg = await satori(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          gap: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <img
            src={avatar}
            alt="avatar"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "#1a202c",
              textAlign: "left",
              wordBreak: "break-word",
            }}
          >
            {text}
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "100px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#2563eb",
          }}
        >
          AniBlue
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Noto Sans JP",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );

  const resvg = new Resvg(svg);
  const pngBuffer = resvg.render().asPng();
  return pngBuffer;
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { handle } = params;
  const agent = await getSessionAgent(request);

  if (agent && handle) {
    const profile = await agent?.getProfile({ actor: handle });
    const pngBuffer = await generateOgImage(
      profile.data.displayName! + "のプロフィール",
      profile.data.avatar!
    );
    return new Response(pngBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  return "";
}
