import satori from "satori";
import { LoaderFunctionArgs } from "@remix-run/node";
import sharp from "sharp";
import { Agent } from "@atproto/api";
import fs from "fs";

const fontData = fs.readFileSync("./fonts/NotoSansJP-Bold.ttf");

async function generateOgImage(text: string, avatar?: string): Promise<Buffer> {
  const styles = {
    container: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#ffffff",
      position: "relative",
      padding: "40px",
    },
    content: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px",
      maxWidth: "1500px",
      margin: "0 auto",
    },
    textContainer: {
      display: "flex",
      alignItems: "center",
      gap: "32px",
      maxWidth: "800px",
    },
    avatar: {
      width: "120px",
      height: "120px",
      borderRadius: "60px",
      objectFit: "cover",
    },
    text: {
      fontSize: "64px",
      fontWeight: "bold",
      color: "#1a202c",
      lineHeight: "1.2",
      letterSpacing: "-0.02em",
      textAlign: "left",
      wordBreak: "break-word",
    },
    footer: {
      position: "absolute",
      bottom: "40px",
      right: "40px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 24px",
      backgroundColor: "rgba(37, 99, 235, 0.1)",
      borderRadius: "99px",
    },
    brand: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#2563eb",
      letterSpacing: "-0.01em",
    },
  };

  const svg = await satori(
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.textContainer}>
          {avatar && <img src={avatar} alt="avatar" style={styles.avatar} />}
          <div style={styles.text}>{text}</div>
        </div>
      </div>
      <div style={styles.footer}>
        <div style={styles.brand}>AniBlue</div>
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
      `${profile.data.displayName}の視聴しているアニメ`,
      profile.data.avatar
    );

    return createImageResponse(pngBuffer);
  } catch (e) {
    console.error(e);

    return new Response(null, { status: 500 });
  }
}
