import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { createClient } from "~/lib/auth/client";
import { Form } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { LogIn } from "lucide-react";

//ログイン処理
export const action = async ({ request }: ActionFunctionArgs) => {
  //Debug用
  const res = await fetch(
    "https://maril.pds.marukun-dev.com/.well-known/atproto-did"
  );

  const text = await res.text();

  console.log(text);

  const formData = await request.formData();
  const handle = formData.get("handle");
  const client = await createClient();

  if (typeof handle === "string") {
    const url = await client.authorize(handle, {
      scope: "atproto transition:generic",
    });

    return redirect(url.toString());
  }

  return null;
};

export default function Index() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="md:w-1/3 rounded-lg shadow-lg">
        <CardContent className="p-6 space-y-8">
          <h1 className="text-2xl font-bold">AniBlue</h1>
          <h1>
            AniBlueは、アニメの視聴記録を行うことができるツールです。
            <br />
            視聴記録は、すべてユーザーのPDSに保存されます。
          </h1>

          <h1 className="text-2xl font-bold">BlueSkyアカウントでログイン</h1>

          <Form method="post">
            <div>
              <Input
                type="text"
                name="handle"
                id="handle"
                placeholder="Enter your handle"
                className="w-full p-2 rounded"
                required
              />
            </div>

            <Button type="submit" className="my-8 w-full font-semibold rounded">
              <LogIn />
              Login
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
