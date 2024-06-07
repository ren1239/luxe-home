import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import NoItem from "../components/NoItem";
import { ListingCard } from "../components/ListingCard";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore();
  const data = prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          photo: true,
          id: true,
          Favorite: true,
          price: true,
          country: true,
          description: true,
          Reservation: true,
        },
      },
    },
  });
  return data;
}

export default async function ReservationsRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getData(user.id);
  return (
    <section className="container mx-auto px-5 lg:px-10  mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h2>
      {data.length === 0 ? (
        <NoItem
          description="Please make your first reservation!"
          title="You dont't have any Resevations..."
        />
      ) : (
        <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.Home?.id}
              description={item.Home?.description as string}
              imagePath={item.Home?.photo as string}
              location={item.Home?.country as string}
              price={item.Home?.price as number}
              userId={user?.id}
              pathName="/favorites"
              favoriteId={item.Home?.Favorite[0]?.id as string}
              isInFavoriteList={
                (item.Home?.Favorite.length as number) > 0 ? true : false
              }
              homeId={item.Home?.id as string}
            />
          ))}
        </div>
      )}
    </section>
  );
}
