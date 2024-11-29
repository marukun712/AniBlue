import { FormEvent } from "react";
import { Input } from "./input";
import { useNavigate } from "react-router-dom";
import { Form } from "@remix-run/react";
import { LogOut } from "lucide-react";

export function Header() {
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = form.get("title");

    if (title) {
      navigate(`/home/search?title=${title}`);
    }
  }

  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/home/">
          <h1 className="text-2xl font-bold text-foreground">AniBlue</h1>
        </a>
        <div className="flex md:w-1/4 w-1/2">
          <Form onSubmit={handleSubmit} method="get">
            <Input placeholder="アニメ名で検索...." name="title" />
          </Form>
          <a href="/logout/" className="px-5 py-2">
            <LogOut />
          </a>
        </div>
      </div>
    </header>
  );
}
