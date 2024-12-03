import satori from "satori";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import fs from "fs";
import sharp from "sharp";

async function generateOgImage(text: string, avatar?: string): Promise<Buffer> {
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
          {avatar && (
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
          )}
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
          data: fs.readFileSync("/fonts/NotoSansJP-Regular.ttf"),
          weight: 700,
          style: "normal" as const,
        },
      ],
    }
  );

  const svgBuffer = Buffer.from(svg);
  return sharp(svgBuffer).png().toBuffer();
}

function createImageResponse(buffer: Buffer): Response {
  return new Response(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    const { handle } = params;
    const agent = await getSessionAgent(request);

    if (!agent || !handle) {
      return new Response(null, { status: 401 });
    }

    const profile = await agent.getProfile({ actor: handle });
    if (!profile) {
      return new Response(null, { status: 404 });
    }

    const pngBuffer = await generateOgImage(
      `${profile.data.displayName}のプロフィール`,
      profile.data.avatar
    );

    return createImageResponse(pngBuffer);
  } catch (e) {
    console.error(e);

    return new Response(null, { status: 500 });
  }
}
