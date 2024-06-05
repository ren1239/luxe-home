import { File } from "lucide-react";
import React from "react";

export default function NoItem() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border-dashed border-2 p-8 text-center animate-in fade-in-50 mt-10 ">
      <div className="flex h-20 w-20 items-center justify-center bg-primary/10 rounded-full ">
        <File className="w-10 h-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">Sorry No Listing Found...</h2>
      <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
        Please check another category or create your own listing!
      </p>
    </div>
  );
}
