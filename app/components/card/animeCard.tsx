import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Status } from "@types";

interface AnimeCardProps {
  id: string;
  title: string;
  image: string | null;
  status: Status | null;
}

export function AnimeCard({ id, title, image, status }: AnimeCardProps) {
  return (
    <Card className="group h-full bg-card hover:bg-accent/50 transition-colors">
      <a href={`/home/details?id=${id}`} className="block h-full">
        <CardHeader className="p-0">
          <div className="aspect-video relative">
            <img
              src={image || "/no_image_yoko.jpg"}
              alt="アニメのサムネイル画像"
              className="rounded-t-lg object-cover w-full h-full"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-sm font-medium line-clamp-2">
            {title}
          </CardTitle>
        </CardContent>

        {status && (
          <CardFooter className="p-4 pt-0">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20"
            >
              {status}
            </Badge>
          </CardFooter>
        )}
      </a>
    </Card>
  );
}
