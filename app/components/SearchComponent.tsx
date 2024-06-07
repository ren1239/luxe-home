"use client";
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { useState } from "react";
import { useCountries } from "../lib/getCountries";
import HomeMap from "./HomeMap";
import { Button } from "@/components/ui/button";
import { CreationSubmit } from "./SubmitButtons";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "@/app/components/Counter";

export function SearchModelComponent() {
  const [step, setStep] = useState(1);
  const [locationValue, SetLocationValue] = useState("");
  const { getAllCountries } = useCountries();

  function SubmitButtonLocal() {
    if (step === 1) {
      return (
        <Button onClick={() => setStep(step + 1)} type="button">
          {" "}
          Next
        </Button>
      );
    } else if (step === 2) {
      return <CreationSubmit />;
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full py-2 px-5  md:border flex items-center cursor-pointer">
          <div className="flex h-full divide-x text-xs lg:text-sm font-medium">
            <p className="px-4 hidden md:block">Anywhere</p>
            <p className="px-4 hidden md:block">Any Week</p>
            <p className="px-4 hidden md:block">Add Guests</p>
          </div>
          <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="gap-4 flex flex-col">
          <input type="hidden" name="country" value={locationValue} />
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a Country</DialogTitle>
                <DialogDescription>
                  Please Choose a Country, so that we know what you want
                </DialogDescription>
              </DialogHeader>
              <Select
                required
                onValueChange={(value) => SetLocationValue(value)}
                value={locationValue}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a country" />
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Countries</SelectLabel>
                      {getAllCountries().map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.flag}
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </SelectTrigger>
              </Select>
              <HomeMap locationValue={locationValue} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Select your requirements</DialogTitle>
                <DialogDescription>
                  Please the number of guests, bedrooms and bathrooms you
                  require
                </DialogDescription>
              </DialogHeader>
              <Card>
                <CardHeader className="flex flex-col gap-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Guests</h3>
                      <p className="text-muted-foreground text-sm">
                        How many guests do you want?
                      </p>
                    </div>
                    <Counter name="guest" />
                  </div>
                </CardHeader>
                <CardHeader className="flex flex-col gap-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Bedrooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How many bedrooms do you have?
                      </p>
                    </div>
                    <Counter name="bedroom" />
                  </div>
                </CardHeader>
                <CardHeader className="flex flex-col gap-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Bathrooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How many bathrooms do you have?
                      </p>
                    </div>
                    <Counter name="bathroom" />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}
          <DialogFooter>
            <SubmitButtonLocal />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
