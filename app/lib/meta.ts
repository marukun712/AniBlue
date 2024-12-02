export const generateMetadata = (title: string, imageUrl?: string) => {
  const fullTitle = `${title} | AniBlue`;
  const description =
    "AniBlueは、アニメの視聴記録を行うことができるツールです。視聴記録は、すべてユーザーのPDSに保存されます。";

  const metadata = [
    { title: fullTitle },
    { name: "description", content: description },

    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "AniBlue" },
  ];

  if (imageUrl) {
    metadata.push({ property: "og:image", content: imageUrl });
  }

  return metadata;
};
