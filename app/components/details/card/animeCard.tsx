import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface AnimeCardProps {
  id: string;
  title: string;
  image: string | null;
  statusText?: string;
}

export function AnimeCard({ id, title, image, statusText }: AnimeCardProps) {
  return (
    <Card className="h-full w-full bg-card hover:bg-accent/50 transition-colors">
      <a href={`/details?id=${id}`} className="flex flex-col h-full">
        <CardHeader className="p-0 flex-shrink-0">
          <div className="relative w-full pt-[56.25%]">
            <img
              src={image || "/no_image_yoko.jpg"}
              alt="アニメのサムネイル画像"
              className="rounded-t-lg object-cover absolute top-0 left-0 w-full h-full"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-sm sm:text-base font-medium line-clamp-2">
            {title}
          </CardTitle>
        </CardContent>
        {statusText && (
          <CardFooter className="p-4 pt-0">
            <p className="text-sm text-muted-foreground">{statusText}</p>
          </CardFooter>
        )}
      </a>
    </Card>
  );
}
