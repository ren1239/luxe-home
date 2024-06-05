import { File, FileQuestion } from "lucide-react";
import React from "react";

interface iAppProps {
  title: string;
  description: string;
}

export default function NoItem({ description, title }: iAppProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border-dashed border-2 p-8 text-center animate-in fade-in-50 mt-10 ">
      <div className="flex h-20 w-20 items-center justify-center bg-primary/10 rounded-full ">
        <FileQuestion className="w-10 h-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
