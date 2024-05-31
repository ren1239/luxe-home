"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export function Counter({ name }: { name: string }) {
  const [amount, setAmount] = useState(0);

  const handleClick = (type: string) => {
    if (type === "plus") setAmount(amount + 1);
    if (amount > 0 && type === "minus") setAmount(amount - 1);
  };
  return (
    <div className="flex items-center gap-x-4">
      <input type="hidden" name={name} value={amount} />
      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={() => handleClick("minus")}
      >
        <Minus className="h-4 w-4 text-primary" />
      </Button>
      <p className="w-3 text-center">{amount}</p>
      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={() => handleClick("plus")}
      >
        <Plus className="h-4 w-4 text-primary" />
      </Button>
    </div>
  );
}
