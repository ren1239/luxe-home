"use client";

import { categoryItems } from "../lib/categoryItems";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

export function SelectCategory() {
  const [SelectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-4 m-10 gap-8 mx-auto w-3/5 mb-36">
      {categoryItems.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            className={SelectedCategory === item.name ? "border-primary" : ""}
            onClick={() => {
              if (SelectedCategory === null) {
                setSelectedCategory(item.name);
              }
              if (SelectedCategory === item.name) {
                console.log("deselect");
                setSelectedCategory(null);
              } else {
                setSelectedCategory(item.name);
              }
            }}
          >
            <CardHeader>
              <Image
                src={item.imageUrl}
                alt={item.name}
                height={32}
                width={32}
                className="w-8 h-8"
              />
              <h3 className="front-medium text-sm">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
