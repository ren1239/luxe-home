import Image from "next/image";
import { useCountries } from "../lib/getCountries";
import Link from "next/link";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButtons";
import { AddToFavorite, DeleteFromFavorite } from "../actions";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId: string;
  pathName: string;
}

export function ListingCard({
  description,
  imagePath,
  location,
  price,
  userId,
  favoriteId,
  isInFavoriteList,
  homeId,
  pathName,
}: iAppProps) {
  const { getCountriesByValue } = useCountries();
  const country = getCountriesByValue(location);

  return (
    <div className="flex flex-col ">
      <div className="relative h-72 ">
        <Image
          src={`https://nmiyqvoytwgkwzjevigo.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt={"Image of House"}
          fill
          className="rounded-lg h-full object-cover mb-3 "
        />

        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavoriteList ? (
              <form action={DeleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />

                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={AddToFavorite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />

                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>
      <Link href="">
        <h3 className=" text-base font-medium">
          {country?.flag}
          {country?.label}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground ">
          <span className="font-medium text-black">${price}</span> a Night
        </p>
      </Link>
    </div>
  );
}
