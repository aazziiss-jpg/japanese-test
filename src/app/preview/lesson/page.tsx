import { Suspense } from "react";
import { LessonRoute } from "@/components/preview/lesson-route";

export default function LessonPreviewPage() {
  return (
    <Suspense fallback={<LessonFallback />}>
      <LessonRoute />
    </Suspense>
  );
}

function LessonFallback() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col" aria-hidden="true">
      <div className="flex items-center gap-4">
        <div className="size-9 border border-line" />
        <div className="flex flex-1 gap-1">
          {Array.from({ length: 5 }).map((_, segment) => (
            <span key={segment} className="h-[3px] flex-1 bg-line" />
          ))}
        </div>
      </div>
      <div className="mt-6 h-3 w-56 bg-line" />
      <div className="mt-4 min-h-[420px] border border-line bg-paper-raised" />
    </div>
  );
}
