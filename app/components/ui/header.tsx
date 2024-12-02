import { FormEvent, useState } from "react";
import { Input } from "~/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Form } from "@remix-run/react";
import { LogIn, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui//avatar";
import { Button } from "~/components/ui/button";
import { useProfile } from "~/state/profile";

export function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const profile = useProfile();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = form.get("title");

    if (title) {
      navigate(`/search?title=${title}`);
    }
  }

  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/">
          <h1 className="text-2xl font-bold text-foreground">AniBlue</h1>
        </a>
        <div className="flex items-center md:w-1/4 w-1/2">
          <Form onSubmit={handleSubmit} method="get" className="flex-grow mr-4">
            <Input placeholder="アニメ名で検索...." name="title" />
          </Form>

          {profile ? (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile.avatar} alt="avatar" />
                    <AvatarFallback>{profile.displayName}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <a href={`/${profile.handle}`} className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>プロフィール</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/logout" className="flex items-center text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>ログアウト</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <a href="/login">
              <LogIn />
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
