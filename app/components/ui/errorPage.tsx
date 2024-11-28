import { TriangleAlertIcon } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="flex justify-center">
          <TriangleAlertIcon className="h-12 w-12 text-primary" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          エラーが発生しました。
        </h1>
        <div className="mt-6">
          <a
            href="/home"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            トップページに戻る
          </a>
        </div>
      </div>
    </div>
  );
}
