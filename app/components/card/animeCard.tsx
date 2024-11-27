import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { State } from "@types";

interface AnimeCardProps {
  title: string;
  image: string;
  status: State;
}

export function AnimeCard({ title, image, status }: AnimeCardProps) {
  return (
    <Card className="w-[250px] flex flex-col">
      <CardHeader className="p-0">
        <div className="relative w-full h-[140px]">
          <img
            src={image || "/no_image_yoko.jpg"}
            alt="アニメのサムネイル画像"
            className="rounded-t-lg object-cover w-full h-full"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Badge variant={status === "watching" ? "secondary" : "default"}>
          {status}
        </Badge>
      </CardFooter>
    </Card>
  );
}
