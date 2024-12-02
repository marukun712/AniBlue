import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { ActionFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { createClient } from "~/lib/auth/client";
import { Form, useActionData } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { LogIn } from "lucide-react";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/hooks/use-toast";
import { useEffect } from "react";
import { generateMetadata } from "~/lib/meta";

export const meta: MetaFunction = () => {
  return generateMetadata("ログイン");
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const client = await createClient();
  const formData = await request.formData();
  const handle = formData.get("handle")?.toString().trim();

  if (!handle) {
    return { error: "ハンドルを入力してください" };
  }

  try {
    const url = await client.authorize(handle, {
      scope: "atproto transition:generic",
    });
    return redirect(url.toString());
  } catch (e) {
    return {
      error: "ログインに失敗しました。ハンドルが正しいかご確認ください。",
    };
  }
};

export default function Index() {
  const { toast } = useToast();
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData?.error) {
      toast({
        title: "Error",
        description: actionData.error,
        variant: "destructive",
      });
    }
  }, [actionData?.error, toast]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Toaster />

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
