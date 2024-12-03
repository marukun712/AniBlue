import satori from "satori";
import { LoaderFunctionArgs } from "@remix-run/node";
import sharp from "sharp";
import { Agent } from "@atproto/api";

async function fetchFont() {
  const res = await fetch(
    "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap"
  );
  const css = await res.text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  )?.[1];

  if (!resource) {
    throw new Error("Failed to fetch font");
  }

  const fontRes = await fetch(resource);
  return await fontRes.arrayBuffer();
}

async function generateOgImage(text: string, avatar?: string): Promise<Buffer> {
  const fontData = await fetchFont();

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
          data: fontData,
          weight: 700,
          style: "normal",
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

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const { handle } = params;

    if (!handle) {
      return new Response(null, { status: 400 });
    }

    const agent = new Agent("https://public.api.bsky.app");

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
