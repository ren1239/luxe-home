import { GetReservation } from "@/app/actions";
import CategoryShowcase from "@/app/components/CategoryShowcase";
import HomeMap from "@/app/components/HomeMap";
import SelectCalander from "@/app/components/SelectCalander";
import { ReservationSubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

function formatText(text: string) {
  return text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
}

async function getData(homeId: string) {
  noStore();
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      id: true,
      country: true,
      photo: true,
      description: true,
      bathrooms: true,
      bedrooms: true,
      categoryName: true,
      price: true,
      title: true,
      guests: true,
      Reservation: {
        where: {
          homeId: homeId,
        },
      },
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
  return data;
}

export default async function HomeRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const { getCountriesByValue } = useCountries();
  const country = getCountriesByValue(data?.country as string);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="w-[95%] sm:w-[75%] mx-auto mt-10 mb-36">
      <h1 className=" font-semibold text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          alt="Image of home"
          src={`https://nmiyqvoytwgkwzjevigo.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          fill
          className="rounded-lg object-cover  w-ful h-full"
        />
      </div>
      <div className="flex justify-between gap-x-24 mt-8  flex-col sm:flex-row">
        <div className="w-full sm:w-2/3">
          <h3 className="text-xl font-medium">
            {country?.flag}
            {country?.label}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p className="">
              {data?.guests} Guests * {data?.bedrooms} Bedrooms *{" "}
              {data?.bathrooms} Bathrooms
            </p>
          </div>
          <div className="flex items-center mt-6 ">
            <img
              className="rounded-full w-11 h-11 "
              src={
                data?.User?.profileImage ??
                "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
              }
              alt="user"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">
                {" "}
                Hosted by {data?.User?.firstName}{" "}
              </h3>
              <p className="text-sm text-muted-foreground">Host since 2015</p>
            </div>
          </div>
          <Separator className="my-7 " />
          <CategoryShowcase categoryName={data?.categoryName as string} />
          <Separator className="my-7 " />
          <p className="text-muted-foreground">
            {" "}
            {data?.description && formatText(data.description)}
          </p>
          <Separator className="my-7 " />
          <HomeMap locationValue={country?.value as string} />
        </div>
        <form action={GetReservation} className="flex flex-col items-center">
          <input type="hidden" name="userId" value={user?.id} />
          <input type="hidden" name="homeId" value={params.id} />
          <SelectCalander reservation={data?.Reservation} />
          {user?.id ? (
            <ReservationSubmitButton />
          ) : (
            <Button asChild className="w-full mx-4">
              <Link href={"/api/auth/login"}> Make a Reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
