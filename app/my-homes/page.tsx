import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import NoItem from "../components/NoItem";
import { ListingCard } from "../components/ListingCard";

async function getData(userId: string) {
  const data = await prisma.home.findMany({
    where: {
      userId: userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      id: true,
      country: true,
      photo: true,
      description: true,
      price: true,
      Favorite: {
        where: {
          userId: userId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function MyHomes() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getData(user.id);
  return (
    <section className=" container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight"> Your Homes</h2>
      {data.length === 0 ? (
        <NoItem
          description={"Please add a listting to get started"}
          title="No Listings"
        />
      ) : (
        <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-8">
          {" "}
          {data.map((item) => (
            <div>
              <ListingCard
                key={item.id}
                description={item.description as string}
                imagePath={item.photo as string}
                location={item.country as string}
                price={item.price as number}
                userId={user?.id}
                pathName="/favorites"
                favoriteId={item.Favorite[0]?.id as string}
                isInFavoriteList={
                  (item.Favorite.length as number) > 0 ? true : false
                }
                homeId={item.id as string}
              />{" "}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
